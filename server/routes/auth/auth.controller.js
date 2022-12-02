const dotenv = require("dotenv").config({ path: "../.env" });
const mysql = require('mysql');
const { serialize } = require('v8');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD, 
    port: process.env.DATABASE_PORT, 
    database: process.env.DATABASE_DATABASE
});
connection.connect();

// test
exports.testAuthPage = (req, res) => {
    console.log("test success");
    res.send("test auth page");
}

// 로그인 확인
// ?id,pw: 로그인 성공 여부를 확인하고 해당 id, pw를 갖는 user의 정보 반환
exports.checkLogin = (req, res) => {
    let {id, pw} = req.query;
    console.log(id);
    console.log(pw);

    let sql = "SELECT * FROM user WHERE userId=? AND userPwd=?";
    let params = [id, pw];
    connection.query(sql, params, 
        (err, rows, fields) => {
            if(rows != undefined){
                console.log("exist");
                res.send(rows);
            }
            else{
                console.log("not exist")
                res.send("-1");
            }
        });
}