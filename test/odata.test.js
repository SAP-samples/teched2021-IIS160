const cds = require('@sap/cds/lib')
const { GET, POST, PATCH, axios, expect } = cds.test(__dirname+'/..')
const EDIT = (url) => POST (url+'/TravelService.draftEdit',{})
const SAVE = (url) => POST (url+'/TravelService.draftActivate')
axios.defaults.headers['content-type'] = 'application/json;IEEE754Compatible=true' // REVISIT: can be removed when @sap/cds 5.1.5 is released?


describe ("Basic Querying", () => {

  it ("should read from row references", async()=>{
    const TravelRef = {ref:[{
      id:'TravelService.Travel',
      cardinality:{max:1},
      where:[ {ref:['TravelUUID']},'=',{val:'e87f1e25331411ec959fd79bb4702f0b'} ]
    }]}
    const travel = await SELECT.from (TravelRef)
    expect (travel) .to.exist
    expect (travel.TravelID) .to.eql (102)
  })

})



describe('Basic OData', () => {

  it('serves $metadata documents in v4', async () => {
    const { headers, status, data } = await GET `/processor/$metadata`
    expect(status).to.equal(200)
    expect(headers).to.contain({
      'content-type': 'application/xml',
      'odata-version': '4.0',
    })
    expect(data).to.contain('<EntitySet Name="Travel" EntityType="TravelService.Travel">')
    expect(data).to.contain('<Annotation Term="Common.Label" String="Travel"/>')
  })

  it('GET /processor/Travel', async () => {
    const { data } = await GET(`/processor/Travel?$filter=TravelUUID eq 'e87f1df9331411ec959fd79bb4702f0b'`)
    expect(data.value).to.containSubset([{
      "createdAt": '2021-10-07T10:10:40.000Z',
      "createdBy": 'Buchholm',
      "LastChangedAt": '2021-10-23T19:59:39.000Z',
      "LastChangedBy": 'Gueldenpfennig',
      "TravelUUID": 'e87f1df9331411ec959fd79bb4702f0b',
      "TravelID": 98,
      "BeginDate": '2022-05-30',
      "EndDate": '2022-05-30',
      "BookingFee": 30,
      "TotalPrice": 7310,
      "CurrencyCode_code": 'EUR',
      "Description": 'Business Trip to Germany',
      "TravelStatus_code": 'X',
      "GoGreen": false,
      "GreenFee": null,
      "TreesPlanted": null,
      "to_Agency_AgencyID": '070048',
      "to_Customer_CustomerID": '000471',
      "acceptEnabled": true,
      "rejectEnabled": false,
      "deductDiscountEnabled": false,
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false
    }])
  })

  it('supports $select', async () => {
    const { data } = await GET(`/processor/Travel`, {
      params: { $select: `TravelID,Description` }
    })
    expect(data.value).to.containSubset([
      { TravelID: 98, Description: 'Business Trip to Germany' }
    ])
  })

  it('supports $expand', async () => {
    const { data } = await GET(`/processor/Travel`, {
      params: {
        $select: `TravelID`,
        $expand: `to_Agency($select=Name,City)`
      }
    })
    expect(data.value).to.containSubset([
      { TravelID: 98, to_Agency: {Name: "Rocky Horror Tours", City:'Santa Monica'} },
    ])
  })

  it('supports $value requests', async () => {
    const { data } = await GET `/processor/Travel(TravelUUID='e87f1e25331411ec959fd79bb4702f0b',IsActiveEntity=true)/to_Customer/LastName/$value`
    expect(data).to.equal('Delon')
  })

  it('supports $top/$skip paging', async () => {
    const { data: p1 } = await GET `/processor/Travel?$select=TravelID,Description&$top=3&$orderby=TravelID`
    expect(p1.value).to.containSubset([
      {"Description": "Vacation", "IsActiveEntity": true, "TravelID": 1},
      {"Description": "Vacation to Mars", "IsActiveEntity": true, "TravelID": 2},
      {"Description": "Business Trip to United States", "IsActiveEntity": true, "TravelID": 3},
    ])
    const { data: p2 } = await GET `/processor/Travel?$select=Description&$skip=3&$orderby=TravelID`
    expect(p2.value).not.to.containSubset([
      {"Description": "Business Trip for Christine, Pierre", "TravelID": 1},
      {"Description": "Vacation", "TravelID": 2},
      {"Description": "Vacation", "TravelID": 3},
    ])
  })

  it('new draft has initial key, key is auto incremented upon activation', async () => {
    const { data: newDraft } = await POST(`/processor/Travel`, {})
    expect(newDraft).to.contain({ TravelID: 0 }) // initial value: 0

    // patch new draft in order to fill mandatory fields
    await PATCH (`/processor/Travel(TravelUUID='${newDraft.TravelUUID}',IsActiveEntity=false)`, {
      BeginDate: '2028-04-01',
      EndDate: '2028-04-02',
      BookingFee: '11',
      to_Customer_CustomerID: '000001',
      to_Agency_AgencyID: '070001',
      CurrencyCode_code: 'USD'
    })

    const { data: newTravel } = await SAVE (`/processor/Travel(TravelUUID='${newDraft.TravelUUID}',IsActiveEntity=false)`)
    expect(newTravel).to.contain({ TravelID: 1423, TotalPrice: 11 })
  })

  it ('re-calculates totals after booking fee changed', async ()=>{
    let Travel1422 = `/processor/Travel(TravelUUID='e89935b2331411ec959fd79bb4702f0b',IsActiveEntity=true)`
    let Draft = `/processor/Travel(TravelUUID='e89935b2331411ec959fd79bb4702f0b',IsActiveEntity=false)`
    let Booking = `/processor/Booking(BookingUUID='e89935b3331411ec959fd79bb4702f0b',IsActiveEntity=false)`
    let Supplement = `/processor/BookingSupplement(BookSupplUUID='e89935b4331411ec959fd79bb4702f0b',IsActiveEntity=false)`

    let { data:draft } = await EDIT (Travel1422)
    expect(draft).to.containSubset({
      TotalPrice: 7344,
      TravelID: 1422,
    })

    // Ensure it is not in accepted state as that would disallow changing
    await POST (Draft +`/TravelService.rejectTravel`)

    // Change the Travel's Booking Fee
    await PATCH (Draft, { BookingFee: '120' })
    await expect_totals (7444)

    // Change a Booking's Flight Price
    await PATCH (Booking, { FlightPrice: '1657' })
    await expect_totals (5481)

    // Change a Supplements's Price
    await PATCH (Supplement, { Price: '220' })
    await expect_totals (5692)

    // Save Draft
    await SAVE (Draft)
    await expect_totals (5692, 'IsActiveEntity=true')

    async function expect_totals (expected, _active = 'IsActiveEntity=false') {
      let { data: { TotalPrice } } = await GET (`/processor/Travel(TravelUUID='e89935b2331411ec959fd79bb4702f0b',${_active})?
        $select=TotalPrice
      `)
      expect(TotalPrice).to.eql(expected)
    }
  })

  it('deduct discount multiple times does not end up in error', async () => {
    const { data: res1 } = await GET `/processor/Travel(TravelUUID='e87f1e25331411ec959fd79bb4702f0b',IsActiveEntity=true)`
    expect(res1).to.contain({ TotalPrice: 8897.8, BookingFee: 50 })

    const { data: res2 } = await POST(
      `/processor/Travel(TravelUUID='e87f1e25331411ec959fd79bb4702f0b',IsActiveEntity=true)/TravelService.deductDiscount`,
      { percent: 11 }
    )
    expect(res2).to.contain({ TotalPrice: 8892.3, BookingFee: 44.5 })

    const { data: res3 } = await POST(
      `/processor/Travel(TravelUUID='e87f1e25331411ec959fd79bb4702f0b',IsActiveEntity=true)/TravelService.deductDiscount`,
      { percent: 11 }
    )
    expect(res3).to.contain({ TotalPrice: 8887.405, BookingFee: 39.605 })

    const { data: res4 } = await POST(
      `/processor/Travel(TravelUUID='e87f1e25331411ec959fd79bb4702f0b',IsActiveEntity=true)/TravelService.deductDiscount`,
      { percent: 11 }
    )
    // rounded to 3 decimals
    expect(res4).to.contain({ TotalPrice: 8883.048, BookingFee: 35.248 })
  })

  it('allows deducting discounts on drafts as well', async ()=>{
    const Active = `/processor/Travel(TravelUUID='e87f1dd3331411ec959fd79bb4702f0b',IsActiveEntity=true)`
    const Draft = `/processor/Travel(TravelUUID='e87f1dd3331411ec959fd79bb4702f0b',IsActiveEntity=false)`

    const { data:res0 } = await GET (Active)
    expect(res0).to.contain({ TravelID:94, TotalPrice: 5627.8, BookingFee: 30 })

    const { data:res1 } = await EDIT (Active)
    expect(res1).to.contain({ TotalPrice: 5627.8, BookingFee: 30 })

    // Change the Travel's dates to avoid validation errors
    const today = new Date().toISOString().split('T')[0]
    await PATCH (Draft, { BeginDate: today })
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
    await PATCH (Draft, { EndDate: tomorrow })

    const { data:res2 } = await POST (`${Draft}/TravelService.deductDiscount`, { percent: 50 })
    expect(res2).to.contain({ TotalPrice: 5612.8, BookingFee: 15 })

    const { data:res3 } = await GET (Draft)
    expect(res3).to.contain({ TotalPrice: 5612.8, BookingFee: 15 })

    await SAVE (Draft)

    const { data:res4 } = await GET (Active)
    expect(res4).to.contain({ TotalPrice: 5612.8, BookingFee: 15 })
  })

})
