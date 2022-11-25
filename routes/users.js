const fs = require('fs');
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

console.log(conf.host);

const connection = mysql.createConnection({
    host: conf.host, 
    user: conf.user, 
    password: conf.password, 
    port: conf.port, 
    database: conf.database
});
connection.connect();

// 회원 가입
router.post('/', (req, res) => {
    let sql = "INSERT INTO user VALUES (?, ?, ?, ?, ?, ?);";
    let id = req.body.userId;
    console.log(id);
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

    let params = [id, name, email, home, school, bio];
    connection.query(sql, params, 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        });
});

// :user-id 회원 프로필
router.get('/:userId', (req, res) => {
    let { userId } = req.params;
    console.log(userId);

    connection.query(
        "SELECT * FROM user WHERE userId = ?;", userId, 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// admin 회원
// *데이터 베이스 수정 필요*
router.get('/api/users/admin', (req, res) => {
    connection.query(
        "SELECT * FROM user;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 회원의 모든 팔로워들
// *데이터 베이스 테이블 추가 필요*
router.get('/:user-id/followers', (req, res) => {
    connection.query(
        "SELECT * FROM user;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 회원의 모든 프로젝트
// 회원의 모든 프로젝트 중 현재 열린 프로젝트
// *진행 중*
router.get('/api/users/:user-id/projects', (req, res) => {
    connection.query(
        "SELECT * FROM user;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 회원의 리뷰들
// *진행 중*
router.get('/api/users/:user-id/reviews', (req, res) => {
    connection.query(
        "SELECT * FROM user;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 회원에게 리뷰 달기
// *진행 중*
router.post('/api/users/:user-id/projects', (req, res) => {
    connection.query(
        "SELECT * FROM user;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

//-----------------------------------Message-------------------------------------
// 회원의 모든 알림
// ?unread=true => 회원의 읽지 않은 알림
// *진행 중*
router.get('/api/users/:user-id/notifications', (req, res) => {
    connection.query(
        "SELECT * FROM user;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 회원의 모든 쪽지
// *진행 중*
router.get('/api/users/:user-id/messages', (req, res) => {
    connection.query(
        "SELECT * FROM user;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 회원의 특정 쪽지
// *진행 중*
router.get('/api/users/:user-id/messages/:message-id', (req, res) => {
    connection.query(
        "SELECT * FROM user;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 회원의 특정 쪽지 삭제
// *진행 중*
router.delete('/api/users/:user-id/messages/:message-id', (req, res) => {
    connection.query(
        "SELECT * FROM user;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 회원에게 쪽지 보내기
// *진행 중*
router.post('/api/users/:user-id/messages', (req, res) => {
    connection.query(
        "SELECT * FROM user;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

module.exports = router;