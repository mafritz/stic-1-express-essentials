//This examples shows the use of a post route to add some content created in an HTML form
//The example is built upon the example 4, which means it also uses templates

//Include the express module and create the app
var express = require('express');
var app = express();

//Include the template module that must be installed with npm install ejs
//There are different template engines (e.g. jade), in this case we use ejs --> http://www.embeddedjs.com/
var ejs = require('ejs');

//Include the body-parser template which is useful to intercept the data passed to the request (e.g. form fields)
//The module must be installed with npm install body-parser
var bodyParser = require('body-parser');

//Use the bodyParser as a middleware to intercept all the request and identify the different content
app.use(bodyParser.urlencoded({
    extended: false
}));

//Define the folder where templates are stored
app.set('views', './files/ex8/views');
//Define the template engine
app.set('view engine', 'ejs');

//Define some data that will be included in the templates
var notes = [
    {
        ex: 1,
        grade: 5.75
    }, {
        ex: 2,
        grade: 5.5
    }, {
        ex: 3,
        grade: 6
    }
];

//Define a route for the homepage that uses the homepage.ejs template
app.get("/", function (request, response) {
    //Use the response.render() method, which accepts the filename of the template and an array of data to pass to it
    //In this case we pass a variable with the cours name STIC I and the notes object defined above
    //These two variables will be accessible in the template
    response.render('homepage.ejs', {
        cours: "STIC I",
        notes: notes
    });
});

//Define a post route that will save new notes
app.post("/add", function (request, response) {
    //Create a new object with the data passed from the HTML form in the homepage
    //The values are added to the request.body object, and every value is available with the name of the field
    var newNote = {
            ex: request.body.ex,
            grade: request.body.grade
        }
        //Add the note to the array
    notes.push(newNote);
    //Send a message that confirms the operation and a link to the homepage
    response.send('Data has been saved! <a href="/">Go to the homepage</a>');
});

//Launch the webserver
app.listen(3000, console.log("Server listening to port 3000"));
