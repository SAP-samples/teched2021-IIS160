using TravelService from '../srv/travel-service';
using from '../db/schema';
using from './capabilities';

//
// annotatios that control the fiori layout
//

annotate TravelService.Travel with @UI : {

  Identification : [
    { $Type  : 'UI.DataFieldForAction', Action : 'TravelService.acceptTravel',   Label  : '{i18n>AcceptTravel}'   },
    { $Type  : 'UI.DataFieldForAction', Action : 'TravelService.rejectTravel',   Label  : '{i18n>RejectTravel}'   },
    { $Type  : 'UI.DataFieldForAction', Action : 'TravelService.deductDiscount', Label  : '{i18n>DeductDiscount}' }
  ],
  HeaderInfo : {
    TypeName       : '{i18n>Travel}',
    TypeNamePlural : '{i18n>Travels}',
    Title          : {
      $Type : 'UI.DataField',
      Value : TravelID
    },
    Description    : {
      $Type : 'UI.DataField',
      Value : '{i18n>TravelID}'
    }
  },
  PresentationVariant : {
    Text           : 'Default',
    Visualizations : ['@UI.LineItem'],
    SortOrder      : [{
      $Type      : 'Common.SortOrderType',
      Property   : TravelID,
      Descending : true
    }]
  },
  SelectionFields : [
    TravelID,
    to_Agency_AgencyID,
    to_Customer_CustomerID,
    TravelStatus_code
  ],
  LineItem : [
    { $Type  : 'UI.DataFieldForAction', Action : 'TravelService.acceptTravel',   Label  : '{i18n>AcceptTravel}'   },
    { $Type  : 'UI.DataFieldForAction', Action : 'TravelService.rejectTravel',   Label  : '{i18n>RejectTravel}'   },
    { $Type  : 'UI.DataFieldForAction', Action : 'TravelService.deductDiscount', Label  : '{i18n>DeductDiscount}' },
    { Value : TravelID               },
    { Value : to_Agency_AgencyID     },
    { Value : to_Customer_CustomerID },    
    { Value : BeginDate              },
    { Value : EndDate                },
    { Value : BookingFee             },
    { Value : TotalPrice             },
    { Value : TravelStatus_code      },    
    { Value : Description            }
  ],
  Facets : [{
    $Type  : 'UI.CollectionFacet',
    Label  : '{i18n>Travel}',
    ID     : 'Travel',
    Facets : [
      {  // general data
        $Type  : 'UI.ReferenceFacet',
        ID     : 'GeneralData',
        Target : '@UI.FieldGroup#GeneralData',
        Label  : '{i18n>Travel}'
      },
      {  // price data
        $Type  : 'UI.ReferenceFacet',
        ID     : 'Prices',
        Target : '@UI.FieldGroup#Prices',
        Label  : '{i18n>Prices}'
      },
      {  // dates
        $Type  : 'UI.ReferenceFacet',
        ID     : 'Dates',
        Target : '@UI.FieldGroup#Dates',
        Label  : '{i18n>Dates}'
      }
    ]
  }, {  // booking list
      $Type  : 'UI.ReferenceFacet',
      Target : 'to_Booking/@UI.LineItem',
      Label  : '{i18n>Booking}'
    }
  ],
  FieldGroup#GeneralData : { Data : [
    { Value : to_Customer_CustomerID },    
    { Value : to_Agency_AgencyID     },
    {
      $Type       : 'UI.DataField',
      Value       : TravelStatus_code,
      Criticality : TravelStatus.criticality,
      Label : '{i18n>Status}' // label only necessary if differs from title of element
    },
    { Value : Description            }
  ]},
  FieldGroup#Prices : { Data : [
    { Value : BookingFee             },
    { Value : TotalPrice             }
  ]},
  FieldGroup#Dates : { Data : [
    { Value : BeginDate              },
    { Value : EndDate                }
  ]}
};
annotate TravelService.Booking with @UI : {
  Identification : [
    { Value : BookingID },
  ],
  HeaderInfo : {
    TypeName       : '{i18n>Bookings}',
    TypeNamePlural : '{i18n>Bookings}',
    Title          : { Value : BookingID },
    Description    : {
      $Type : 'UI.DataField',
      Value : '{i18n>BookingID}'
    }
  },
  // Exercise 5: add chart header facet

  PresentationVariant : {
    Text           : 'Default',
    Visualizations : ['@UI.LineItem'],
  },
  SelectionFields : [],
  LineItem                : {
  //Exercise 3.1 Add Table Line Criticality
  
  $value : [
    { Value : to_Carrier.AirlinePicURL,  ![@UI.Importance] : #High},
    {
        $Type : 'UI.DataField',
        Value : BookingID,
        ![@UI.Importance] : #High
    },
  //  Exercise 5: add chart table column

    { Value : to_Customer_CustomerID, ![@UI.Importance] : #High },
    { Value : to_Carrier_AirlineID, ![@UI.Importance] : #High   },  
    { Value : ConnectionID,         ![@UI.Importance] : #High   },
    { Value : FlightDate, ![@UI.Importance] : #High             },
    { Value : FlightPrice, ![@UI.Importance] : #High            },
    { Value : BookingStatus_code     }
  ]},
  Facets : [{
    $Type  : 'UI.CollectionFacet',
    Label  : '{i18n>Booking}',
    ID     : 'Booking',
    Facets : [{  // booking details
      $Type  : 'UI.ReferenceFacet',
      ID     : 'BookingData',
      Target : '@UI.FieldGroup#BookingData',
      Label  : 'Booking'
    }]
  }, {  // supplements list
    $Type  : 'UI.ReferenceFacet',
    Target : 'to_BookSupplement/@UI.LineItem',
    Label  : '{i18n>BookingSupplement}'
  }],
  FieldGroup #BookingData : { Data : [
    { Value : BookingID              },
    { Value : BookingDate,           },
    { Value : to_Customer_CustomerID },
    { Value : to_Carrier_AirlineID   },
    { Value : ConnectionID           },
    { Value : FlightDate             },
    { Value : FlightPrice            },
    { Value : BookingStatus_code     }
  ]}
};
annotate TravelService.BookingSupplement with @UI : {
  Identification : [
    { Value : BookingSupplementID }
  ],
  HeaderInfo : {
    TypeName       : '{i18n>BookingSupplement}',
    TypeNamePlural : '{i18n>BookingSupplements}',
    Title          : { Value : BookingSupplementID },
    Description    : { Value : BookingSupplementID }
  },
  LineItem : [
    { Value : BookingSupplementID                                       },
    { Value : to_Supplement_SupplementID, Label : '{i18n>ProductID}'    },
    { Value : Price,                      Label : '{i18n>ProductPrice}' }
  ],
};

// Exercise 5: Booking entity Chart annotation


// Exercise 6: BookedFlights entity Chart annotation