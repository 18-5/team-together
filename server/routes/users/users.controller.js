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

exports.testUserPage = (req, res) => {
    res.send("test user page");
}

// 회원 가입
exports.signIn = (req, res) => {
    let sql = "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?);";
    let id = req.body.userId;
    console.log(id);
    let pw = req.body.userPW;
    let name = req.body.userName;
    console.log(name);
    let email = req.body.userEmail;
    console.log(email);
    let home = req.body.userHomepage;
    console.log(home);
    let school = req.body.userSchool;
    console.log(school);
    let bio = req.body.userBio;
    console.log(bio);

    let params = [id, pw, name, email, home, school, bio];
    connection.query(sql, params,
        (err, rows, fields) => {
            if(err){
                res.send(err);
            }
            else {
                console.log(rows);
                res.send(rows);
            }
        });
}


// 내가 리더인 프로젝트
// *complete*
exports.whereUserIsLeader = (req, res) => {
    let userId = req.params['userId'];
    let sql = "SELECT * FROM project WHERE projectId IN (SELECT projectId FROM member WHERE userId = " + userId + " AND leader = 1);";

    connection.query(
        sql,
        (err, rows, fields) => {
            res.send(rows);
        }
    );
}

// :user-id 회원 프로필
// *complete*
exports.userProfile = (req, res) => {
    let userId = req.params['userId'];
    console.log(userId);

    connection.query(
        "SELECT * FROM user WHERE userId =" + userId + ";",
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
}


// 회원의 모든 팔로워들
// *데이터 베이스 테이블 추가 필요*
exports.allFollowers = (req, res) => {
    connection.query(
        "SELECT * FROM user;",
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
}

// 회원의 모든 프로젝트
// 회원의 모든 프로젝트 중 현재 열린 프로젝트
// *complete*
exports.userAllProjects = (req, res) => {
    let userId = req.params['userId'];
    console.log(userId);

    let sql = "SELECT * FROM project WHERE projectState=0 AND projectId IN (SELECT projectId FROM member WHERE userId = " + userId + ");";

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

// 회원의 리뷰들
// *진행 중*
exports.userReviews = (req, res) => {
    connection.query(
        "SELECT * FROM user;",
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
}

// 회원에게 리뷰 달기
// *진행 중*
exports.writeReview = (req, res) => {
    connection.query(
        "SELECT * FROM user;",
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
}

