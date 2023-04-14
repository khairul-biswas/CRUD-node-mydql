const express = require('express');
const mysql   = require('mysql');
const app = express();

// set the view engine to ejs
app.set('view engine','ejs');

// use res.render to load up an ejs view file 

// index page
app.get('/', (req,res) => {
    var mascots = [
        {name: 'Sammy', organization: "DigitalOcen", bitrh_year: 2012},
        {name: 'Tux', organization: "Linux", bitrh_year: 1996},
        {name: 'Moby Dock', organization: "Docker", bitrh_year: 2013}
    ];
    var tagline = "No programming concept is complete without a cuet animal mascot.";
    res.render('pages/index',{
        mascots: mascots,
        tagline: tagline
    });
});

// about page
app.get('/about', (req,res) => {
    res.render('pages/about');
});


app.listen('3000', () => {
    console.log('server started on port 3000');
});


module.exports = {
    mysql,
    app
}