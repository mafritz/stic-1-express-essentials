//This example shows the use of a middleware in a route

//Include the express module and create the app
var express = require('express');
var app = express();

//Try to change this value from false to true and check the different routes of the app
var siteOnline = false;

//Define a middleware function that accepts three arguments: the request, the response, and a next which passes on to the next middleware
var checkOnline = function (request, response, next) {
    if (siteOnline) {
        //If the site is online, the next middleware is evaluated
        next();
    } else {
        //If the site is not online, the response ends here, no further middleware, not even routes, will be evaluted
        response.send("The site is not online");
    }
}

//Define a route that explicitly use the checkOnline middleware, passed as a second argument of the get method
app.get("/", checkOnline, function (request, response) {
    response.send("Homepage");
});

//Apply the checkOnline middleware to all subsequent routes
app.use(checkOnline);

//Define other routes
app.get("/about", function (request, response) {
    response.send("About");
});

app.get("/contacts", function (request, response) {
    response.send("Contacts");
});

//Launch the webserver
app.listen(3000, console.log("Server listening to port 3000"));
