const dotenv = require("dotenv").config({ path: "../.env" });
const mysql = require('mysql');
const { serialize } = require('v8');

//console.log(process.env.DATABASE_HOST);

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD, 
    port: process.env.DATABASE_PORT, 
    database: process.env.DATABASE_DATABASE
});
connection.connect();

// test
exports.testNotiPage = (req, res) => {
    res.send("test Noti page");
}

// 회원의 모든 알림
// ?unread=true => 회원의 읽지 않은 알림
// *copmlete*
exports.userAllAlram = (req, res) => {
    let userId = req.params['userId'];
    let sql = "SELECT * FROM message WHERE receiverId = " + userId + " AND unread = 1;";

    connection.query(
        sql,
        (err, rows, fields) => {
            if (err) {
                res.send(err);
            } else {
                console.log(rows);
                res.send(rows);
            }
        }
    );
}

