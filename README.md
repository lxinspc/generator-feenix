# feenix

A yeoman generator for SAP UI5 projects.




## Configuration options

To start a new UI5 project, `yo feenix` 

Project configuration options…

+ project name [default folder name]
+ component prefix (e.g. com.gumdropandpsider)
+ total prefix [component prefix + project name]
+ application type
+ application style [2]
+ create neo-app.json file [n]
+ create readme.md file [y]
+ Odata service (leave blank to specify later)
+ Use mockserver
  + url parameter to invoke [reponderOn=true]
  + Generate mock data shells from Odata service? [y]




## What does configuration do…

### Default behaviour
Create the following files in the destimation folder

+ `Component.js.
+ `Component-preload.js`

### If user mockserver = yes
Add code to instantiate the mock server on desired url parameter into component.js

### If generate mock data shells = yes
Call the Odata service to get

+ `service document`
+ `metadata.xml`

Create a `model` directory, and copy the `metadata.xml` document to it
For each entity and entity set specified in the service document, create the required `JSON` file, with empty object (`{}`)


## Detail Option Values

### Application Types
1. Single Screen
2. Master Detail
3. Master/Master Detail

### Application Styles
1. Component only
2. Standalone + component (has index.html + component.js)
