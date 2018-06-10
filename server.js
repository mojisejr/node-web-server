const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

//handlebar partials in the html(hbs) page
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
//middle ware
//do thing when some action rised inthe page
//this is my own created middle ware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}, ${req.url}`;
    
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log("Unable to append to the server log");
        }
    })
    next();
});

/*app.use((req, res, next) => {
   res.render('maintenance.hbs'); 
});*/
app.use(express.static(__dirname + '/public'));
//hbs helping class to pass the variable
hbs.registerHelper('getCurrentYear', () => {
   return new Date().getFullYear(); 
});

hbs.registerHelper('screamIt', (text) => {
   return text.toUpperCase(); 
});

app.get('/', (req, res) => {
    //res.send("<h1>Hello Express!</h1>");
    res.render('home.hbs', {
        pageTitle: 'Landing Page',
        leadMsg: 'welcome to some website',
        welcomeMsg: 'Hi all this is my first webpage the built by using nodejs + express and some middle ware.',
    });
});
app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page'
   });
});

//create route /bad -send back json with errMsg
app.get('/bad', (req, res) => {
   res.send({
       error: "001",
       msg: ["error", "this is an error"]
   }); 
});


app.listen(port, () => {
    console.log(`Server is up on port : ${port}`);
});