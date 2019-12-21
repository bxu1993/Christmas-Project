const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');

var app = express();
const bodyparser = require('body-parser');

app.use(express.urlencoded({extended: false}));
app.use(morgan('short'));

const router =require('./routes/user.js');
app.use(router);

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(express.static('./public'));

// var mysqlConnection = mysql.createConnection({
//     host:'localhost',
//     port: 3306,
//     user: 'bxu1993',
//     password: '387622736',
//     database: 'mydatabase'
// });

// mysqlConnection.connect((err)=>{
//     if(!err){
//         console.log('DB connection succeded');
//     }else{
//         console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
//     }
// });

//comment

app.listen(1337,function(){
    console.log('ready on port 1337');
})

module.exports = app;