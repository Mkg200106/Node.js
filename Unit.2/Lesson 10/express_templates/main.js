const express = require("express");                              // Require Express
const app = express();                                           // Create an Express app
const homeController = require("./controllers/homeController");  // Require the homeController
const layouts = require("express-ejs-layouts")                   // Require Express layouts

app.set("view engine", "ejs");                                    // Tell express to use EJS for templates 
app.use(layouts);                                                 // Tell express to use the layouts as middleware
app.set("port", process.env.PORT || 3000);                       //Set the port

app.get("/name/:myName", homeController.respondWithName);        // Using a route parameter

//Start server
app.listen(app.get("port"), () => {
    console.log('Server running at http://localhost:${app.get("port")}');
});