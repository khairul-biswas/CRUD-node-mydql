const createError = require('http-errors');
const express = require('express');
const mysql   = require('mysql');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const bodyParser = require('body-parser');

//Create Connection

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
});

//Connect
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});
//app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(flash());
app.use(session({ 
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}))
// set the view engine to ejs
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));


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
// Posts page
app.get('/posts', (req,res) => {
    var sql = 'SELECT * FROM posts';
    db.query(sql, (err,result) => {
        if (err) throw err;
        res.render('pages/posts',{
            querys: result
        });
    })
    
});

// Posts page
app.get('/post/(:id)', (req,res) => {
    let id = req.params.id;
    var sql = 'SELECT * FROM posts WHERE id = ' + id;
    db.query(sql, (err,result) => {
        if (err) throw err;
        res.render('pages/post',{
            querys: result
        });
    })
    
});

// login page
app.get('/login', (req,res) => {
    res.render('pages/login');
});


// add post page
app.get('/new-post', (req,res) => {
    res.render('pages/new-post',{
        title: '',
        body: ''
    });
});
app.post('/new-post', (req,res) => {
    let title = req.body.title;
    let body = req.body.body;
    let errors = false;
    if(title.length === 0 && body.length === 0){
        errors = true;
        req.flash('error', "Please enter title and description");
        
    }else{
        let post = {
            title: title,
            body: body
        };
        console.log(req.body);
        
        var sql = 'INSERT INTO posts SET ?';
        db.query(sql,post, (err,result) => {
            if (err) throw err;
            req.flash('success', 'Post successfully added');
            res.redirect('/posts');
        });
    }




    // if(title === "" || body === ""){
    //     errors = true;
    //     req.flash('error', "Please enter title and description");
    //     res.render('pages/new-post',{
    //         title: title,
    //         body: body
    //     });
    // }else{
    //     var form_data = {
    //         title: title,
    //         body: body
    //     }
    //     var sql = `INSERT INTO posts (title, body) VALUES ('${form_data.title}', '${form_data.body}')`;
    //     db.query(sql, (err,result) => {
    //         if (err) {
    //             req.flash('error', err);
    //             res.render('pages/new-post',{
    //                 title: title,
    //                 body: body
    //             })   
    //         }else{
    //             req.flash('success', 'Post successfully added');
    //             res.redirect('/posts');
    //         }
    //     });
    // }
    




    


});

app.listen('3000', () => {
    console.log('server started on port 3000');
});


module.exports = {
    mysql,
    app
}