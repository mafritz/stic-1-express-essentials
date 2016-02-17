//This examplem shows the use of cookies to simulate a demonstrarion-only, NON SECURE, way to authorize users

//Include the express module and create the app
var express = require('express');
var app = express();

//Include the body-parser template which is useful to intercept the data passed to the request (e.g. form fields)
//The module must be installed with npm install body-parser
var bodyParser = require('body-parser');
//Use the bodyParser as a middleware to intercept all the request and identify the different content
app.use(bodyParser.urlencoded({
    extended: false
}));

//Include the cookie-parder to do the same with cookies
//The module must be installed with npm install cookie-parser
var cookieParser = require('cookie-parser')
app.use(cookieParser())

//Define a route for the login, which are not yet secured by a middleware that checks for the user
app.get("/login", function (request, response) {
    //Send a simple html file with a login form
    response.sendFile(__dirname + "/files/ex11/login.html");
});
app.post("/login", function (request, response) {
    if (request.body.username == 'test' && request.body.password == '1234') { //Normally the values should be checked againt a database with an encrypted password
        response.cookie('username', request.body.username);
        response.redirect("/");
    } else {
        response.redirect("/login") //Normally the login should show an error message for failed authentication
    }
});

//Define a middleware that checks for the username
function isLoggedIn(request, response, next) {
    //If the request has no cookie with the username, redirect the user to the login page
    if (!request.cookies.username) {
        response.redirect("/login");
    } else {
        //Otherwise get on with the middleware chain
        next();
    }
}
//Apply the middleare globally
app.use(isLoggedIn);

//Define the homepage route, which will be "secured"
app.get("/", function (request, response) {
    var html = "<h1>Homepage</h1>";
    html += "<p>Welcome <strong>" + request.cookies.username + "</strong>!</p>";
    html += '<a href="/logout">Logout</a>';
    response.send(html);
});

//Define the logout route
app.get("/logout", function (request, response) {
    //Clear the cookies
    response.clearCookie('username');
    response.send('You are logged out, <a href="/login">click here to login again</a>');
});
//Launche the app
app.listen(3000, console.log("Server listening to port 3000"));
