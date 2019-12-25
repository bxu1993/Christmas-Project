/*
* This will contain all user related info routes
*/
const express = require('express');
const mysql = require('mysql');
const router = express.Router();

router.get('/messages', (req, res) => {
    console.log("Show some messages or whatever...");
    res.end();
})


const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3306,
    user: 'bxu1993',
    password: '387622736',
    database: 'mydatabase'
});

function getmysqlConnectionPool(){
    return pool;
}
const mysqlConnection = getmysqlConnectionPool();



router.get('/users', (req,res)=>{
    mysqlConnection.query('Select * FROM login_info', (err, rows, fields) =>{
        if(!err){
            console.log(rows[0].userId);
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});

router.get('/users/:id',(req,res) =>{
    mysqlConnection.query('SELECT * FROM login_info WHERE userId = ?', [req.params.id], (err, rows, fields) =>{
        if(!err){
            console.log(rows[0].userId);
            res.send(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/user_create', (req,res) => {
    console.log("Trying to create a new user...");
    console.log("First Name: " + req.body.create_user_name);

    const userName = req.body.create_user_name;
    const userPassword = req.body.create_user_password;
    const userEmail = req.body.create_user_email;

    const querryString = "INSERT INTO login_info(userName, userPass, userEmail) VALUE (?, ?, ?)";
    mysqlConnection.query(querryString, [userName, userPassword, userEmail], (err, results,fields) =>{
        if(err){
            console.log("Failed to insert new user: " + err);
            res.sendStatus(500);
            return;
        };
        console.log("Insert a new user with id: ", results.insertId);
        res.end();
    })
});


// router.delete('/delete_user/:user_id', (req,res) => {
//     const userid = req.params.user_id;
//     console.log("ID: " + JSON.stringify(req.body));
//     mysqlConnection.query('DELETE FROM login_info WHERE userId = ?', [userid], (err, results, fields) =>{
//         if(!err){
//             console.log("Successfully Deleted the user: ", results.affectedRows);
//             res.send("Info has been Deleted");
//         }else{
//             console.log(results.insertid + err);
//         };
//         res.end();
//     })
// });

router.delete('/user_delete', (req,res) => {
    const userName = req.body.user_name;
    const userPassword = req.body.user_password;
    const userEmail = req.body.user_email;

    console.log("user id: " + JSON.stringify(userName));
    mysqlConnection.query('DELETE FROM login_info WHERE userName = ? AND userPass = ? AND userEmail = ?', [userName, userPassword, userEmail], (err, results, fields) =>{
        if(!err){
            console.log("Successfully Deleted the user: ", results.affectedRows);
            res.send("Info has been Deleted");
        }else{
            console.log(err);
        };
        res.end();
    })
});


router.delete('/delete_user', (req,res) => {
    let users_info = req.body;
//     const userid = req.body.userId;
    const userName = req.body.user_name;
    const userPassword = req.body.user_password;
    // const userEmail = req.body.user_email;
    console.log("user id: " + JSON.stringify(users_info));
    mysqlConnection.query('DELETE FROM login_info WHERE userName = ? AND userPass = ?', [userName, userPassword], (err, results, fields) =>{
        if(!err){
            console.log("Successfully Deleted the user: ", results.affectedRows);
            res.send("Info has been Deleted");
        }else{
            console.log(err);
        };
        res.end();
    })
});

router.delete('/user_delete', (req,res) => {
    let users_info = req.body;
    const userid = req.body.userId;
    console.log("user id: " + JSON.stringify(users_info));
    console.log("user id: " + JSON.stringify(userid));
    mysqlConnection.query('DELETE FROM login_info WHERE userId = ?', [userid], (err, results, fields) =>{
        if(!err){
            console.log("Successfully Deleted the user: ", results);
            res.send("Info has been Deleted");
        }else{
            console.log(err);
        };
        res.end();
    })
});


router.put('/users',(req,res)=>{
    let users_info = req.body;
    const user_id = users_info.userId;
    const userName = users_info.userName;
    const userPassword = users_info.userPass;
    const userEmail = users_info.userEmail;
    console.log("user id: " + JSON.stringify(users_info));

    const querryString = "UPDATE login_info SET userName  = ?, userPass = ?, userEmail = ? where userId = ? ";
    mysqlConnection.query(querryString, [userName, userPassword, userEmail, user_id], (err, results ,fields) =>{
        if(err){
            console.log("Update not success: " + err);
            res.sendStatus(500);
            return;
        }
        else
            console.log("Update success: ");
        
    })
    res.end();

})


module.exports = router;