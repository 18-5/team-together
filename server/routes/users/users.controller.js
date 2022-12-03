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
    console.log(userName);

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
// 카톡방 리스트
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
// 특정 카톡방 들어가면 나오는 쪽지 리스트
// ORDER BY 수정 필요
// *진행 중*
exports.userMsgByMsgId = (req, res) => {
    let userId = req.params['userId'];
    let otherId = req.params['otherId'];

    let sql = "SELECT * FROM message WHERE senderId = " + userId + " OR senderId = " + otherId + " OR receiverId = " + userId + " OR receiverId = " + otherId + " ORDER BY createdAt DESC;";
    
    //클릭하면 sender, receiver 동시에 겹치는거 싹 긁어서 뿌리기
    //sql paging
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
    );
}

// 회원의 특정 쪽지 삭제
// 쪽지 하나만 삭제? 대화방 전체 삭제? 나에게만 삭제? 둘 다에게 삭제?
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
// senderId와 receiverId 모두 form으로 post, 화면에서는 두 아이디 모두 안보이도록 숨기기
// messageId는 random 4자리수 * 4자리수
// *complete*
exports.sendMsg = (req, res) => {
    let senderId = req.body.senderId;
    let receiverId = req.body.receiverId;
    let content = req.body.content;
    let messageId = Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000);

    let sql = "INSERT INTO message VALUES (?, ?, ?, ?, ?, 1, NULL);";
    let params = [senderId, receiverId, messageId, content, new Date().toISOString().slice(0, 19).replace('T', ' ')];

    /*connection.query(
        "SELECT COUNT(*) AS count FROM user WHERE userId = " + senderId + " OR userId = " + receiverId + ";",
        (err, rows, fields) => {
            const cnt = JSON.stringify(rows[0].count);
            if(err) {
                res.send(err);
            } else if (cnt === "2") {
                res.send(cnt);
            } else {
                res.send("receiver or sender가 회원이 아닙니다.");
            }
        }
    )*/
    connection.query(
        sql, params,
        (err, rows, fields) => {
            if (err) {
                res.send(err);
            }
            else {
                console.log(rows);
                res.send(rows);
            }

        }
    );
}
