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

exports.testUserPage = (req, res) => {
    res.send("test user page");
}

// 회원 가입
exports.signIn = (req, res) => {
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
}


// 내가 리더인 프로젝트
// *진행 중*
exports.whereUserIsLeader = (req, res) => {
    connection.query(
        "SELECT * FROM member WHERE leader = 1;",
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

//-----------------------------------Message-------------------------------------
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

// 회원의 받은 쪽지
// *complete*
exports.userRecievedMsg = (req, res) => {
    let userId = req.params['userId'];
    let sql = "SELECT * FROM message WHERE receiverId = " + userId + ";";

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

// 회원의 모든 쪽지
// *complete*
exports.userAllMsg = (req, res) => {
    let userId = req.params['userId'];
    let sql = "SELECT * FROM message WHERE receiverId = " + userId + " OR senderId = " + userId + ";";

    //receiver 다 받아와서 그중에서 sender 받아와서 시간순 정렬

    connection.query(
        sql,
        (err, rows, fields) => {
            if(err){
                res.send(err);
            }
            else {
                console.log(rows);
                res.send(rows);
            }
        }
    )
}

// 회원의 특정 쪽지
// *진행 중*
exports.userMsgByMsgId = (req, res) => {
    
    //클릭하면 sender, receiver 동시에 겹치는거 싹 긁어서 뿌리기
    //sql paging
    connection.query(
        "SELECT * FROM user;",
        (err, rows, fields) => {
            if(err){
                res.send(err);
            }
            else {
                console.log(rows);
                res.send(rows);
            }
        }
    );
}

// 회원의 특정 쪽지 삭제
// *진행 중*
exports.deleteMsg = (req, res) => {
    connection.query(
        "SELECT * FROM user;",
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
}

// 회원에게 쪽지 보내기
// *진행 중*
exports.sendMsg = (req, res) => {
    connection.query(
        "SELECT * FROM user;",
        (err, rows, fields) => {
            if (err) {

            }
            else {
                console.log(rows);
                res.send(rows);
            }

        }
    );
}