// Import the MongoDB client from the mongodb package
const { MongoClient } = require("mongodb");

// MongoDB connection URL and database name
const dbURL = "mongodb://localhost:27017";
const dbName = "recipe_db";

// Connect to the MongoDB server
MongoClient.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    // Once connected, get the database instance
    let db = client.db(dbName);

    // Query the 'contacts' collection and convert the results into an array
    db.collection("contacts")
      .find()
      .toArray((error, data) => {
        if (error) {
          // If there's an error, throw it
          throw error;
        }
        // If successful, log the data (contacts) to the console
        console.log(data);
      });

    // Insert a new contact into the 'contacts' collection
    db.collection("contacts")
      .insertOne({
        name: "Freddie Mercury", // Name of the contact
        email: "fred@queen.com"  // Email address of the contact
      })
      .then(result => {
        // Log the result of the insertion
        console.log(result);
      })
      .catch(error => {
        // If there's an error inserting, log it
        console.error(error);
      })
      .finally(() => {
        // Close the MongoDB connection after the operation is complete
        client.close();
      });
  })
  .catch(error => {
    // If there's an error connecting to MongoDB, log it
    console.error("Failed to connect to MongoDB", error);
  });

// Import necessary modules for the Express app
const express = require("express");
const app = express();

// Import controllers for handling different routes
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

// Import the express-ejs-layouts package for layout support with EJS
const layouts = require("express-ejs-layouts");

// Set up EJS as the templating engine
app.set("view engine", "ejs");

// Set the port number for the app
app.set("port", process.env.PORT || 3000);

// Middleware to parse URL-encoded data (from form submissions)
app.use(express.urlencoded({ extended: false }));

// Middleware to parse JSON data (for API requests)
app.use(express.json());

// Use express-ejs-layouts for handling layouts in EJS views
app.use(layouts);

// Serve static files (CSS, images, etc.) from the 'public' directory
app.use(express.static("public"));

// Define the home route (GET /), which renders the 'index' page
app.get("/", (req, res) => {
  res.render("index");
});

// Define the route to view courses (GET /courses)
app.get("/courses", homeController.showCourses);

// Define the route to view the contact form (GET /contact)
app.get("/contact", homeController.showSignUp);

// Define the route to handle the submitted contact form (POST /contact)
app.post("/contact", homeController.postedSignUpForm);

// Error handling middleware:
// If no matching route is found, handle 404 errors
app.use(errorController.pageNotFoundError);

// Handle internal server errors (500)
app.use(errorController.internalServerError);

// Start the Express server and listen on the specified port
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
