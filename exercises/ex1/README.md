# Exercise 1 - Generating an SAP Fiori Elements App

In this exercise, you will create a **SAP Fiori elements** application of type **List Report Object Page**, based on the given
SAP Cloud Application Programming Model sample service.
For this you will make usage of the **SAP Fiori tools Application Generator**.

## Exercise 1.1 Using the SAP Fiori tools Application Generator

In the **SAP Business Application Studio**, the **Welcome page** is shown.

\(1\) Click **Start from template** .

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_0.png "mydevspace - SAP Business Application Studio - Google Chrome")

If the Welcome page is not shown, you can start the **Template Wizard** via the Command Palette
(menu View -\>Find Command... or ctrl+shift+p(Win)/cmd+shift+p(Mac))\
In the search field, type **Open Template Wizard**.\
Choose the corresponding list entry.

\(2\) Click on tile **SAP Fiori application**.

\(3\) Click ![icon](images/fieldicon.png).

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_001.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(4\) In the wizard step **Floorplan Selection**, click on the tile **List Report Object Page**.

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_002.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(5\) Click ![icon](images/fieldicon00.png).

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_003.png "mydevspace - SAP Business Application Studio - Google Chrome")

In the wizard step **Datasource and Service Selection**, click \(6\).

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_004.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(7\) Select **Use a Local CAP Project**.

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_005.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(8\) Click the **Browse for folder** icon to select the **CAP project folder path**.

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_006.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(9\) Select folder **teched2021-IIS160** and click ![Open](images/fieldicon04.png).

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_007.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(10\) Click ![icon](images/fieldicon05.png) to open the **OData service** drop-down.

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_008.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(11\) Select  ![option](images/fieldicon06.png).

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_009.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(12\) Click ![icon](images/fieldicon07.png).

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_010.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(13\) In the wizard step **Entity Selection**, open drop-down **Main Entity**, and select **Travel**.\
The data of the main entity is shown in the list report and the first object page.

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_011.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(14\) Open drop-down **Navigation Entity**, and select **to_Booking**.\
This will add an additional routing target allowing navigation from the object page to an additional sub object page.

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_012.png "mydevspace - SAP Business Application Studio - Google Chrome")

Set the option **Automatically add table columns** to **No**.\
![mydevspace - SAP Business Application Studio - Google Chrome](images/img_0121.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(15\) Click ![icon](images/fieldicon10.png).

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_013.png "mydevspace - SAP Business Application Studio - Google Chrome")

In the wizard step **Project Attributes**, add the following attributes to the application project:

- **Module Name**: managetravels\
(module name has to match exactly for some of the subsequent exercises to work properly)

- **Application Title**: Manage Travels\
(or a title by your choice)

- **Application Namespace**: sap.fe.cap\
(namespace has to match exactly for some of the subsequent exercises to work properly)

- **Minimum SAPUI5 version**: Stick to the latest version available (preselected).

\(16\) Select **Yes** in order to configure advanced options.

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_014.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(17\) Click to open the drop-down **UI5 theme**.

\(18\) Select **SAP Horizon (experimental)**.

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_015.png "mydevspace - SAP Business Application Studio - Google Chrome")

Please note that the screenshots in the subsequent exercises show the UI with the SAP Quartz theme.\
The SAP Horizon theme was published after the creation of the exercises.

\(19\) Select **Yes** in order to skip generation of an additional associated annotation.cds file.\
The sample service already provides a basic set of UI annotations with file app/layouts.cds.

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_016.png "mydevspace - SAP Business Application Studio - Google Chrome")

\(20\) Click  ![image](images/fieldicon13.png).\
This will start the app generation.\
When finished, you can review the generated artifacts in the **Explorer** pane of SAP Business Application Studio.\
The generated artifacts are located in folder **app/managetravels** (the path reflects the module name you have entered during app generation).

## Exercise 1.2 Adding an App Preview Script

Besides the common way of starting a CAP service via **cds watch**, another convenient way to start the service and app at the same time is to add an additional **npm script** to file **package.json** of the root folder.\
In **exercises 4 ff.**, we will extend the app based on **xml fragments**. We need to make sure that the browser view cache is deactivated during testing our development, so that changes applied to the xml fragments get properly updated when refreshing the UI.\
(21) Open file **package.json** of the root folder.\
(22) Scroll to section **scripts**, put a comma at the end of the last script line, and press enter to make a new line.\
Enter the following script:

```js
    "watch-managetravels": "PORT=4004 cds watch --open managetravels/webapp/index.html?sap-ui-xx-viewCache=false#fe-lrop-v4" 
```

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_017.png "mydevspace - SAP Business Application Studio - Google Chrome")

Please note the additional parameter **sap-ui-xx-viewCache=false** added to the app start Url.

If a popup appears asking for project migration, please decline with **Don't ask again** (a fix for this is in the making).
## Exercise 1.3 Starting the App

After completing these steps you will have started and tested the generated app.

Instead of using **cds watch** in the terminal in order to start the service, we will use the new script we have added to file **package.json** for that purpose.\
If **cds watch** is already running in a terminal, please end it by pressing keyboard keys **control+c**, otherwise the default port 4004 will already be in use by the existing server process.

\(23\) Click **Preview Application** on tab **Application information** that is automatically displayed after app generation.\
If the tab is closed, you can open it again via menu command **View->Find Command...->Fiori: Open Application Info**.\

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_018.png "mydevspace - SAP Business Application Studio - Google Chrome")

Alternatively, you can select **Preview Application** via the context menu of the app folder.

![mydevspace - SAP Business Application Studio - Google Chrome](images/img_0181.png "mydevspace - SAP Business Application Studio - Google Chrome")

This opens a drop-down at the top offering all **cds run** and **cds watch** based scripts maintained in the scripts section of file **package.json**.

\(24\) Select the start script **watch-managetravels** we have added to the package.json.

![Manage Travels - Google Chrome](images/img_019.png "Manage Travels - Google Chrome")

This runs the service in an Application Modeler terminal session and automatically starts the Fiori application.

![Manage Travels - Google Chrome](images/img_0191.png "Manage Travels - Google Chrome")

- If the preview doesn't get opened in a new tab, check if the pop-ub blocker of your browser prevented that.\
Make sure you enable pop-ups
for SAP Business Application Studio, then restart with **Preview Application** as described above.

![Manage Travels - Google Chrome](images/img_021.png "Manage Travels - Google Chrome")

**Please note that there are currently some minor issues with app preview with a fix in the making:**

- App preview sometimes stops with an error in the Application Modeler terminal pane.\
In that case, close the terminal pane and restart with **Preview Application** as described above
- Restarting app preview sometimes leads to an error due to a blocked preview port.\
In that case, just increase the port in the npm script you have added,
for example change **PORT=4004** to **PORT=4005**, then restart app preview

```js
    "watch-managetravels": "PORT=4005 cds watch --open managetravels/webapp/index.html?sap-ui-xx-viewCache=false#fe-lrop-v4" 
```

\(25\) On the List Report page of the Fiori application, click ![icon](images/fieldicon16.png) to trigger selection.

![Manage Travels - Google Chrome](images/img_020.png "Manage Travels - Google Chrome")

Make yourself familiar with the application:

- on the List Report, use the **selection fields** to set a filter
- Click on a list item to **navigate** to the object page
- Click on **Edit** on the object page to create a **draft version** of the displayed object and to set the UI to edit mode.\
  (Please note that travels with status **Accepted** will only allow editing of field **Description**)
- Change the value of an input field to automatically **update the draft** when input field focus is changed, or when you navigate back to the List Report.
- The draft is saved back to the active instance by pressing **Save** on the bottom of the Object Page.

## Summary

You've now successfully generated and tested the Fiori elements app.

Continue to - [Exercise 2 - Configuring the UI by Using the SAP Fiori tools Page Map](../ex2/README.md)
