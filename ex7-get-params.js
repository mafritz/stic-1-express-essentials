//This examplem shows how routes can have dynmiac parameters, which can be retrieved from the request

//Include the express module and create the app
var express = require('express');
var app = express();

//Include the template module that must be installed with npm install ejs
//There are different template engines (e.g. jade), in this case we use ejs --> http://www.embeddedjs.com/
var jade = require('jade');

//Define the folder where templates are stored
app.set('views', './files/ex7/views');
//Define the template engine
app.set('view engine', 'jade');

//Include the underscore module for facilitating database-like operations
var _ = require('underscore');

//Simulate a database with blog entries
var db = [
    {
        id: 1,
        title: 'My first message',
        text: 'Quae nam possumus transferrem eruditionem ut incurreret consequat ea familiaritatem et ea tempor offendit et malis aliquip iis quorum'
  }, {
        id: 2,
        title: 'My second message',
        text: 'Fugiat sempiternum arbitror nostrud litteris eruditionem enim duis arbitror legam consequat quamquam consectetur enim admodum eruditionem dolore non mandaremus consectetur'
  }, {
        id: 3,
        title: 'Adipisicing firmissimum deserunt transferrem voluptate',
        text: 'Singulis proident quo noster praetermissum nisi consectetur cohaerescant an eiusmod iis efflorescere in eram aliqua reprehenderit laborum an velit do'
  }
];

//Create two routes, the homepage with the list of titles and a detail page that also shows the text
//Homepage route
app.get('/', function (request, response) {
    //Render a jade template to whom we pass all the blog entries
    response.render('homepage.jade', {
        posts: db
    });
});

//Detail route that uses a dynamic param, that is the id of the message given to the link in the homepage's list with the :id param
app.get("/detail/:id", function (request, response) {
    //You can retrive the id through the request.params array, which always returns a string. We need a number to use underscore .findWhere method
    var id = Number(request.params.id);
    var current = _.findWhere(db, {
        id: id
    });
    //Render a jade template to whom we pass the current post, given the id param of the URK
    response.render('detail.jade', {
        post: current
    });
});
//Launch the webserver
app.listen(3000, console.log("Server listening to port 3000"));
