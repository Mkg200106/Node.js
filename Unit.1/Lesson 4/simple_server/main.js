const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  
  // Creating the HTTP server
  app = http.createServer((request, response) => {
    console.log("Received an incoming request!");
    
    // Writing the HTTP header with status 200 and content type HTML
    response.writeHead(httpStatus.OK, {
      "Content-Type": "text/html"
    });
    
    // Creating and sending the HTML response
    let responseMessage = "<h1>Hello, Universe!</h1>";
    response.write(responseMessage);
    response.end();
    console.log(`Sent a response : ${responseMessage}`);
 });

// Start the server
app.listen(port);
console.log(`The server has started and is listening on port number: ${port}`);
