"use strict"; // Enforces stricter parsing and error handling in JavaScript

// Import required modules
const fs = require("fs"), // Built-in module to interact with the file system
   httpStatus = require("http-status-codes"), // Module for readable HTTP status codes
   contentTypes = require("./contentTypes"); // Custom module to handle content types (e.g., HTML, JSON, etc.)

// Export an object with the getFile function
module.exports = {
    // Function to read and serve a file
    getFile: (file, res) => {
        // Read the specified file from the filesystem
        fs.readFile(`./${file}`, (error, data) => {
            if (error) {
                // If there's an error reading the file, send a 500 error response
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
                res.end("There was an error serving content!");
                return; // Exit after sending error response to avoid calling res.end(data)
            }
            // If no error, send the file data as the response
            res.end(data);
        });
    }
};
