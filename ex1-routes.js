//This example shows the use of routes, creating two routes and a link between the two.

//Include the express module and create the app
var express = require('express');
var app = express();

//Define the first route as the homepage
app.get("/", function (request, response) {
    //Send a link to the about page as the response
    response.send('<a href="about.html">About</a>');
});

//Define the route for the about page
app.get("/about.html", function (request, response) {
    //Send some text as response
    response.send("This is the content of the about page!");
});

//Launch the webserver
app.listen(3000, console.log("Server listening at port 3000"));
