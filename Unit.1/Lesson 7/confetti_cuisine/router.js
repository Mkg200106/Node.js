"use strict";

// Import required modules
const httpStatus = require("http-status-codes"), // Provides named constants for HTTP status codes
      contentTypes = require("./contentTypes"),   // Custom module for setting Content-Type headers
      utils = require("./utils");                 // Custom utility functions (e.g., file handling)

// Object to store route handlers organized by HTTP method
const routes = {
  "GET": {},   // Object to store GET route handlers
  "POST": {}   // Object to store POST route handlers
};

// Function to handle incoming requests
exports.handle = (req, res) => {
  try {
    // Attempt to find and call the handler for the specific HTTP method and URL
    routes[req.method][req.url](req, res);
  } catch (e) {
    // If route is not found or an error occurs, respond with an error page
    res.writeHead(httpStatus.OK, contentTypes.html); // Respond with HTML content and status 200 (OK)
    utils.getFile("views/error.html", res);          // Serve a custom error page from views directory
  }
};

// Function to register a GET route handler
exports.get = (url, action) => {
  routes["GET"][url] = action; // Add the handler function to the GET routes
};

// Function to register a POST route handler
exports.post = (url, action) => {
  routes["POST"][url] = action; // Add the handler function to the POST routes
};
