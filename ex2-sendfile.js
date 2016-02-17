//This examples shows how you can use an html file as the content of the response for a route

//Include the express module and create the app
var express = require("express");
var app = express();

//Create the homepage route
app.get("/", function (request, response) {
    //We use the sendFile method to serve a static HTML page
    //The method accepts the absolute path to the file, so we use the shortcut __dirname
    response.sendFile(__dirname + '/files/ex2/homepage.html');
});

//Launch the webserver
app.listen(3000, console.log("Server listening at port 3000"));
