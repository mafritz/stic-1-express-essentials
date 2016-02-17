//Use the express module to create a simple webserver

//Import the express module
var express = require('express');

//Create the application that will serve as web server
var app = express();

//Declare the route for the homepage (i.e. the "/") as a GET
app.get("/", function (request, response) {
    //Send some HTML as the final response for this route
    //Express automatically sends the header depending on the content of the response
    response.send("<h1>This is my homepage</h1>");
});

//Launch the webserver
app.listen(3000, console.log("Server listening at port 3000"));
