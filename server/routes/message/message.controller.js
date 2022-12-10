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

// 회원의 모든 알림
 // ?unread=true => 회원의 읽지 않은 알림
 // *copmlete*
 exports.userAllAlram = (req, res) => {
    let userId = req.params['userId'];
    let sql = "SELECT * FROM message WHERE receiverId = " + userId + " AND unread = 1 AND sednerDelete = 0 AND receiverDelete = 0;";

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
exports.userReceivedMsg = (req, res) => {
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
     let sql = "SELECT * FROM message "
         + "WHERE senderId = " + userId + " AND senderDelete = 0 GROUP BY receiverId "
         + "UNION "
         + "SELECT * FROM message WHERE receiverId = " + userId + " AND receiverDelete = 0 GROUP BY senderId;";

     connection.query(
         sql,
         (err, rows, fields) => {
             if (err) {
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

     //let sql = "SELECT * FROM message WHERE (senderId = " + userId + " AND senderDelete = 0) OR (senderId = " + otherId + " AND receiverDelete = 0) OR (receiverId = " + userId + " AND receiverDelete = 0) OR (receiverId = " + otherId + " AND senderDelete = 0) ORDER BY createdAt DESC;";
     let sql = "SELECT * FROM message WHERE "
         + "(senderId = " + userId + " AND receiverId = " + otherId + " AND senderDelete = 0) "
         + "OR (senderId = " + otherId + " AND receiverId = " + userId + " AND receiverDelete = 0) ORDER BY createdAt DESC";

     //클릭하면 sender, receiver 동시에 겹치는거 싹 긁어서 뿌리기
     //sql paging
     connection.query(
         sql,
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

// 회원의 특정 쪽지 삭제
// 쪽지 하나만 삭제? 대화방 전체 삭제? 나에게만 삭제? 둘 다에게 삭제?
// *진행 중*
exports.deleteMsg = (req, res) => {
    
    let userId = req.params['userId'];
     let msgId = req.params['messageId'];

     let sql = "SELECT senderId, receiverId, senderDelete, receiverDelete, messageId, "
         + "CASE WHEN senderDelete = 0 AND receiverDelete = 0 AND receiverId = " + userId + " THEN 'receiverDelete' "
         + "WHEN senderDelete = 0 AND receiverDelete = 0 AND senderId = " + userId + " THEN 'senderDelete' "
         + "WHEN senderDelete = 1 AND receiverDelete = 0 THEN 'delete' "
         + "WHEN senderDelete = 0 AND receiverDelete = 1 THEN 'delete' "
         + "END AS result "
         + "FROM teamther.message WHERE messageId = " + msgId + ";";
     //messageId 탐색, 아무도 delete하지 않은 경우 -> 내가 sender인지 receiver인지 판단 -> senderDelete = 1 OR receiverDelete = 1
     //senderDelete = 1인 경우 -> 내가 receiver라는 의미 -> delete row
     //receiverDelete = 1인 경우 -> 내가 sender라는 의미 -> delete row

     connection.query(
         sql,
         (err, rows, fields) => {
             let result = JSON.stringify(rows[0].result).toString();
             let sql2 = "";
             if (err) {
                 res.send(err);
             } else {
                 if (result === "\"receiverDelete\"") {// 아직 아무도 delete하지 않은 경우 -> 내가 receiver인 경우
                     sql2 = sql2 + "UPDATE message SET receiverDelete = 1 WHERE messageId = " + msgId + ";";
                     res.send(result);
                 }
                 else if (result === "\"senderDelete\"") { // 아직 아무도 delete하지 않은 경우 -> 내가 sender인 경우
                     sql2 = sql2 + "UPDATE message SET senderDelete = 1 WHERE messageId = " + msgId + ";";
                     res.send(result);
                 } else {
                     sql2 = sql2 + "DELETE FROM message WHERE messageId = " + msgId + ";";
                 }
             }

             connection.query(
                 sql2,
                 (err, rows, fields) => {
                     if (err) {
                         res.send(err);
                     } else {
                         res.send(rows);
                     }
                 }
             );
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
