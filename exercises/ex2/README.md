# Exercise 2 Enhancing the UI by Using the SAP Fiori tools Page Map

In this exercise, you will learn how to use some of the new configuration features provided by the **SAP Fiori tools Page Map**.
## Exercise 2.1 Enable Data Load During Start of the App

When starting the app, per default the user has to press the
**Go** button in order to trigger the selection.\
This allows defining filters before the query is executed.\
The default behaviour can be changed in a way that selection is immediately
triggered when the app is started.

In the SAP Business Application Studio, open the SAP Fiori Page Map by clicking on tile (1) of the **Application Info** tab.

![tools - SAP Business Application Studio - Google Chrome](images/img_0.png "tools - SAP Business Application Studio - Google Chrome")

Alternatively, you can open the Page Map via context menu on project's folder **app** or via **View -> Command Palette...Fiori: Show Page Map**).

\(2\) On the tile **List Report**, click icon **Configure Page**.

![tools - SAP Business Application Studio - Google Chrome](images/img_000.png "tools - SAP Business Application Studio - Google Chrome")

\(3\) In the page editor, click  ![](images/fieldicon01.png).

\(4\) In the drop-down box **Initial Load**, select **Enabled**.\
The configuration is automatically saved.

![tools - SAP Business Application Studio - Google Chrome](images/img_001.png "tools - SAP Business Application Studio - Google Chrome")

Switch to the preview browser tab. After a couple of seconds, the app should reload automatically.\
Data will now be immediately loaded in the List Report page when starting the app.

\(5\) In the List Report, we can see that in case of small screen resolution, column **Travel Status**  is currently only shown when toolbar button **Show Details** is pressed.\
As status information is considered as being important, let us change its sequence in the next exercise.

![Manage Travels - Google Chrome](images/img_002.png "Manage Travels - Google Chrome")

## Exercise 2.2 Change Sequence of a Table Column in the List Report

\(6\) Switch back to the Page Editor and expand section **Columns**.

Drag column **Travel Status** \(7\) and drop it in between columns **Travel** and **Agency** \(8\).

![tools - SAP Business Application Studio - Google Chrome](images/img_003.png "tools - SAP Business Application Studio - Google Chrome")

## Exercise 2.3 Adding Criticality to a Table Column

It is considered as best practice providing a criticality color for status information displayed on the UI.\
For column **Travel Status**, we will now configure this via the Page Map.\
The service model's entity **Travel** already contains property **criticality** in file **db/schema.cds**:

![tools - SAP Business Application Studio - Google Chrome](images/img_0035.png "tools - SAP Business Application Studio - Google Chrome")

\(9\) Select column **Travel Status** in the page editor's section **Columns**.

\(10\) In the properties pane, expand drop-down box **Criticality**.

![tools - SAP Business Application Studio - Google Chrome](images/img_004.png "tools - SAP Business Application Studio - Google Chrome")

\(11\) Select list entry **TravelStatus/criticality**.  

![tools - SAP Business Application Studio - Google Chrome](images/fieldicon07.png "tools - SAP Business Application Studio - Google Chrome").

## Exercise 2.4 Adding Text and Text Arrangement to a Field
In the List Report, we can see that column **Agency** is only showing the identifier, not the agency name.

![tools - SAP Business Application Studio - Google Chrome](images/img_0045.png "tools - SAP Business Application Studio - Google Chrome")

We will now configure the **display text** and the **text arrangement** in order to show the agency name along with the identifier.

\(12\) Select column **Agency** in the page editor's section **Columns**.

\(13\) In pane **Properties**, scroll to property **Text** and expand the drop-down box.

\(14\) Select entry ![](images/fieldicon10.png).

![tools - SAP Business Application Studio - Google Chrome](images/img_005.png "tools - SAP Business Application Studio - Google Chrome")

An additional property **Text Arrangement** is now shown in the properties pane.\
\(15\) Expand the drop-down box.

\(16\) Make sure that list entry  **Text First** is selected.\
With it, column **Agency** will show values in format **<display text\> (<identifier\>)**.

![tools - SAP Business Application Studio - Google Chrome](images/img_006.png "tools - SAP Business Application Studio - Google Chrome")

Switch to the preview browser tab.

\(17\) Column **Travel Status** is now being displayed with criticality coloring at its new position in the table.

\(18\) Column **Agency** is now displayed with the configured text arrangement.

![Manage Travels - Google Chrome](images/img_007.png "Manage Travels - Google Chrome")

## Exercise 2.5 Change Form Field Order and Display Type

On the object page, in field group **Travel** we want to exchange the positioning of fields **Customer** and **Agency**.\
For Field **Description**, in order to have long descriptions properly displayed in edit mode, we will switch the field's display type by using the SAP Fiori tools Page Map.

![tools - SAP Business Application Studio - Google Chrome](images/TextArea.png "tools - SAP Business Application Studio - Google Chrome")

\(19\) In the Page Editor, click on ![](images/fieldicon13.png).

![tools - SAP Business Application Studio - Google Chrome](images/img_008.png "tools - SAP Business Application Studio - Google Chrome")

\(20\) On the **Object Page** tile, click icon **Configure Page** ![](images/fieldicon14.png).

![tools - SAP Business Application Studio - Google Chrome](images/img_009.png "tools - SAP Business Application Studio - Google Chrome")

\(21\) Expand section **Sections->Travel->Subsections->Travel->Form->Fields**.

\(22\) At field **Agency**, click icon **Move Up** ![](images/fieldicon16.png) in order to exchange its position with field **Customer**.\
Alternatively, you can also use **drag & drop**.

![tools - SAP Business Application Studio - Google Chrome](images/img_010.png "tools - SAP Business Application Studio - Google Chrome")

Now let's switch the display type for field **Description**.

\(23\) Select field **Description**.

\(24\) In pane **Properties**, open the drop-down box for property **Display Type** and select list entry **Text Area**.

![tools - SAP Business Application Studio - Google Chrome](images/img_011.png "tools - SAP Business Application Studio - Google Chrome")

 Switch to the preview browser tab.\
\(25\) On the object page, click button ![icon](images/fieldicon19.png).

![Travel - Google Chrome](images/img_012.png "Travel - Google Chrome")


\(26\) Field **Description** is now shown as a **text area**, and the position of fields **Agency** and **Customer** has changed.

![Travel - Google Chrome](images/img_013.png "Travel - Google Chrome")

Click button ![image](images/fieldicon30.png) in order to switch back to display mode.

## Exercise 2.6 Adding a new Field Group

For a **sustainability initiative**, the travel service has been extended to provide some additional fields for the new green flight offering which are not yet shown in the UI.\
In this exercise, we will add a new **subsection Sustainability** to section **Travel** of the object page by using the **Add Form Section** functionality of the **SAP Fiori tools Page Map**.

\(27\) In the SAP Fiori tools Page Map's **page editor** for the object page,
expand **Page Layout - Sections - Travel - Subsections** and click icon **Add Sections** ![icon](images/fieldicon20.png).

![tools - SAP Business Application Studio - Google Chrome](images/img_014.png "tools - SAP Business Application Studio - Google Chrome")

\(28\) Select list entry  ![](images/fieldicon21.png). This opens up a **dialog**.

![tools - SAP Business Application Studio - Google Chrome](images/img_015.png "tools - SAP Business Application Studio - Google Chrome")


\(29\) In the dialog, enter label **Sustainability** and click icon ![](images/fieldicon22.png) in order to substitute it with an **i18n text reference**.

![tools - SAP Business Application Studio - Google Chrome](images/img_016.png "tools - SAP Business Application Studio - Google Chrome")


\(30\) Confirm text key substitution by clicking ![](images/fieldicon23.png).

![tools - SAP Business Application Studio - Google Chrome](images/img_017.png "tools - SAP Business Application Studio - Google Chrome")


\(31\) Click button **Add** to complete the **Add Form Section** dialog.

![tools - SAP Business Application Studio - Google Chrome](images/img_018.png "tools - SAP Business Application Studio - Google Chrome")


\(32\) Expand the form of the the new subsection **Sustainability** and click icon **Add Fields** ![](images/fieldicon26.png) \(33\).

![tools - SAP Business Application Studio - Google Chrome](images/img_019.png "tools - SAP Business Application Studio - Google Chrome")

\(34\) In dialog **Add Fields**, expand drop-down box **Fields**.

\(35\) Select fields **GoGreen, GreenFee and TreesPlanted**.

![tools - SAP Business Application Studio - Google Chrome](images/img_020.png "tools - SAP Business Application Studio - Google Chrome")

\(36\) Click button **Add** to complete the **Add Fields** dialog.

![tools - SAP Business Application Studio - Google Chrome](images/img_021.png "tools - SAP Business Application Studio - Google Chrome")

\(37\) Verify that the fields have been added to the new subsection.

![tools - SAP Business Application Studio - Google Chrome](images/img_022.png "tools - SAP Business Application Studio - Google Chrome")

Switch to the preview browser tab. The new subsection **Sustainability** is shown on the object page.\
\(38\) Click  button ![](images/fieldicon29.png).

![Travel - Google Chrome](images/img_023.png "Travel - Google Chrome")


\(39\)  Select **Trees\-4\-Tickets** check box.

![Travel - Google Chrome](images/img_024.png "Travel - Google Chrome")

\(40\) Click button ![](images/fieldicon30.png).

![Travel - Google Chrome](images/img_025.png "Travel - Google Chrome")


\(41\) With Trees-4-Tickets selected, fields Green Flight Fee and Trees Planted show calculated values after having saved changes.

![Travel - Google Chrome](images/img_026.png "Travel - Google Chrome")

## Summary

By using the SAP Fiori Page Map, you've now configured **initial loading** during app start, changed the **position of a table column and a form field**,\
added **criticality coloring** to a table column, added **text** and **text arrangement** to the identifier field, and added a **new subsection**‚ to section Travel.

Continue to - [Exercise 3 - Fine-Tuning the UI](../ex3/README.md)