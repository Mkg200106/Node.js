const port = 3000,
    http = require("http"),                            // Built-in HTTP module
    httpStatusCodes = require("http-status-codes"),    // For HTTP status codes
    router = require("./router"),                      // Import custom router to handle routes
    fs = require("fs"),                                // Built-in module to interact with the file system

    plainTextContentType = {
        "Content-Type": "text/plain"                   // Content type for plain text responses
    },
    htmlContentType = {
        "Content-Type": "text/html"                    // Content type for HTML responses
    },

    // Function to read a file and send its contents in the response
    customReadFile = (file, res) => {
        // Read the specified file from the file system
        fs.readFile(`./${file}`, (errors, data) => {
            if (errors) {
                console.log ("Error reading the file...");                                // Log error if file can't be read
                res.writeHead(httpStatusCodes.StatusCodes.NOT_FOUND, htmlContentType);  // Respond with 404 if file not found
                res.end("<h1>File Not Found</h1>");
            }
            res.end(data);                                                              // Send the file data in the response
        });
    };

// Route for the home page ('/')
router.get("/", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, plainTextContentType); // Send response header with status OK and content type 'text/plain'
    res.end("INDEX");                                                    // Send the plain text as the response
});

// Route for the '/index.html' page
router.get("/index.html", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, htmlContentType);        // Send response header with status OK and content type 'text/html'
    customReadFile("views/index.html", res);                               // Read and send the contents of 'views/index.html'
});

// Route for serving test.js
router.get("/test.js", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, { "Content-Type": "application/javascript" });
    customReadFile("public/js/test.js", res);
});

// Route for serving test.css
router.get("/test.css", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, { "Content-Type": "text/css" });
    customReadFile("public/css/test.css", res);
});

// Route for serving test.png
router.get("/test.png", (req, res) => {
    res.writeHead(httpStatusCodes.StatusCodes.OK, { "Content-Type": "image/png" });
    customReadFile("public/images/test.png", res);
});

// Route for handling POST requests at the root ('/')
router.post("/", (req, res) => {
    console.log("Received a POST request at /");
    res.writeHead(httpStatusCodes.StatusCodes.OK, plainTextContentType);  // Send response header with status OK and content type 'text/plain'
    res.end("POSTED");                                                    // Send the text 'POSTED' as the response
});

// Create the server and make it listen on the specified port
http.createServer(router.handle).listen(3000);
console.log(`The server is listening on port number: ${port}`);
