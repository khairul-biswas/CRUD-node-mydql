const {app} = require("./app")
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




//Create Database

app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err) throw err;
        colsole.log(result);
        res.send('Database Created');
    })
})

//Create post data table
app.get('/createposttable', (req,res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts table created...');
    })
})

//Add a Post
app.get('/addpost',(req,res) => {
    let post = {title:'Post Two',body:'This is the test post details'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql,post, (err,result) => {
        if (err) throw err;
        console.log(result);
        res.send('Post 1 added');
    })
})
//Select  Post
app.get('/getpost',(req,res) => {
    let sql = 'SELECT * FROM posts';
    let query = db.query(sql, (err,result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts fetched...');
    })
})
//Select single Post
app.get('/getpost/:id',(req,res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err,result) => {
        if (err) throw err;
        console.log(result);
        res.send('Posts fetched...');
    })
})
//Update Post
app.get('/updatepost/:id',(req,res) => {
    let newTitle = 'UPdate Title';
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err,result) => {
        if (err) throw err;
        console.log(result);
        res.send('Update post title...');
    })
})