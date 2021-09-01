const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({path:'./.env'})

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// app.get("/" ,(req,res) => {
//     res.render("index")
// })

db.connect((error) => {
    if(error) {
        console.log(error);
    }
    else{
        console.log("MYSQL Connected");
    }
})

app.use('/', require('./routes/page'));
app.use('/auth', require('./routes/auth'));

app.listen(5007, () => {
    console.log("Server  started on port 5007");
})