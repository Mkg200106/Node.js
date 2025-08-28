// ==============================
// 1. Import Required Modules
// ==============================

// Importing Express for building the web server
const express = require("express");

// Importing mongoose to interact with MongoDB
const mongoose = require("mongoose");

// Layout support for EJS templates
const layouts = require("express-ejs-layouts");

// Importing controllers for handling specific routes
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");

// Importing the Subscriber model from the separate schema file
const Subscriber = require("./models/subscriber");


// ==============================
// 2. Database Configuration
// ==============================

// Connecting to the MongoDB database using mongoose
mongoose.connect("mongodb://localhost:27017/recipe_db", {
  useNewUrlParser: true,  // Use the new URL parser for better compatibility
  useUnifiedTopology: true // always remember to add this path due to your using the latest version useNewUrlParser doesnt work properly.
});

// Store the connection object to interact with the database
const db = mongoose.connection;

// MongoDB connection open event handler
// This ensures that once the connection to the database is successfully established, we can perform operations
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
  main(); // Call the async function to run DB operations
});


// ==============================
// 3. Sample Mongoose Operations
// ==============================

// Define an asynchronous function to handle database operations
async function main() {
  try {
    // Creating a new Subscriber instance and saving it to the database
    const subscriber1 = new Subscriber({
      name: "Jon Wexler",        // Name of the subscriber
      email: "jon@jonwexler.com" // Email of the subscriber
    });

    // Saving the new subscriber document to MongoDB using async/await
    const savedDocument1 = await subscriber1.save();
    console.log("Saved with .save():", savedDocument1); // Log the saved document

    // Another way to create and save a document in one step using the `create` method
    const savedDocument2 = await Subscriber.create({
      name: "Jon Wexler",        // Name of the subscriber
      email: "jon@jonwexler.com" // Email of the subscriber
    });
    console.log("Saved with .create():", savedDocument2); // Log the saved document

    // Querying the 'subscribers' collection to find a subscriber by name and email pattern
    const foundSubscriber = await Subscriber.findOne({
      name: "Jon Wexler"   // Find a subscriber with the name 'Jon Wexler'
    }).where("email", /wexler/); // Further filter where the email contains 'wexler'

    // Log the result if found
    if (foundSubscriber) {
      console.log("Found subscriber:", foundSubscriber.name); // Log the name
    }
  } catch (error) {
    // Handle and log any errors during the database operations
    console.error("Error during database operations:", error);
  }
}


// ==============================
// 4. Express App Configuration
// ==============================

// Initialize the Express application
const app = express();

// Set the view engine to EJS, so we can render .ejs templates
app.set("view engine", "ejs");

// Set the port for the server to listen on (either from the environment or default to 3000)
app.set("port", process.env.PORT || 3000);

// Middleware to handle form submissions (parses URL-encoded data, e.g., form data)
app.use(express.urlencoded({ extended: false }));

// Middleware to parse incoming JSON data (used for API requests, etc.)
app.use(express.json());

// Set up EJS layouts (this will allow you to use layout templates across different pages)
app.use(layouts);

// Serve static files (e.g., CSS, JavaScript) from the 'public' directory
app.use(express.static("public"));


// ==============================
// 5. Routes
// ==============================

// Define the root route (GET /) to render the 'index' view
app.get("/", (req, res) => {
  res.render("index");  // Renders the 'index.ejs' file located in the 'views' directory
});

// Define the route to show courses (GET /courses)
app.get("/courses", homeController.showCourses);

// Define the route to show the sign-up form (GET /contact)
app.get("/contact", homeController.showSignUp);

// Define the route to handle form submissions from the contact page (POST /contact)
app.post("/contact", homeController.postedSignUpForm);


// ==============================
// 6. Error Handling
// ==============================

// Error handling: if a page is not found (404 error), render a custom error page
app.use(errorController.pageNotFoundError);

// Error handling: if there's an internal server error (500 error), render a custom error page
app.use(errorController.internalServerError);


// ==============================
// 7. Start Server
// ==============================

// Start the Express server and listen on the specified port (either from environment or 3000)
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
