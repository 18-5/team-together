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
exports.testMsgPage = (req, res) => {
    res.send("test Msg page");
}

//-----------------------------------Message-------------------------------------
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
// 보내거나 받은 메시지 중 최상한 하나만 표시
// *complete*
exports.userAllMsg = (req, res) => {
    let userId = req.params['userId'];
    let sql = "SELECT * FROM message WHERE senderId = " + userId + " GROUP BY receiverId UNION SELECT * FROM message WHERE receiverId = " + userId + " GROUP BY senderId;";

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
// ORDER BY 수정 필요 -> 수정 완료
// *complete*
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
    // let messageId = Math.ceil(Math.random() * 10000) * Math.ceil(Math.random() * 10000);

    // let sql = "INSERT INTO message VALUES (?, ?, ?, ?, ?, 1, NULL);";
    let sql = "INSERT INTO message(senderId, receiverId, content, createdAt, unread, lastReadAt) VALUES (?, ?, ?, ?, 1, NULL);";
    let params = [senderId, receiverId, content, new Date().toISOString().slice(0, 19).replace('T', ' ')];

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
