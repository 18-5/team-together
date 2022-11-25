const fs = require('fs');
const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host, 
    user: conf.user, 
    password: conf.password, 
    port: conf.port, 
    database: conf.database
});
connection.connect();

// 프로젝트 생성
router.post('/', (req, res) => {
    let sql = "INSERT INTO project VALUES (?, ?, ?, NOW(), 0);";
    let id = req.body.projectId;
    console.log(id);
    let name = req.body.projectName;
    console.log(name);
    let desc = req.body.description;
    console.log(desc);

    let params = [id, name, desc];
    connection.query(sql, params, 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        });
});

// 모든 프로젝트
// ?name-has: 이름을 포함하는 프로젝트 검색
// ?status: 모든 열린 프로젝트
// *진행 중*
router.get('/', (req, res) => {
    let { nameHas, status } = req.query;

    if((nameHas != undefined) && (status != undefined)) {
        let sql = "SELECT * FROM project WHERE projectName = '"
            + nameHas + "',projectState = '" + status + "';";
        connection.query(
            sql, 
            (err, rows, fields) => {
                console.log(rows);
                res.send(rows);
            }
        );
    }
    else if((nameHas != undefined) && (status == undefined)) {
        let sql = "SELECT * FROM project WHERE projectName = '"
            + nameHas + "';";
        connection.query(
            sql, 
            (err, rows, fields) => {
                console.log(rows);
                res.send(rows);
            }
        );
    }
    else if((nameHas == undefined) && (status != undefined)) {
        let sql = "SELECT * FROM project WHERE projectState = '"
            + status + "';";
        connection.query(
            sql, 
            (err, rows, fields) => {
                console.log(rows);
                res.send(rows);
            }
        );
    }
    else if((nameHas == undefined) && (status == undefined)) {
        let sql = "SELECT * FROM project;";
        connection.query(
            sql, 
            (err, rows, fields) => {
                console.log(rows);
                res.send(rows);
            }
        );
    }
});

// :project-id 프로젝트
router.get('/:projectId', (req, res) => {
    let { projectId } = req.params;
    console.log(projectId);

    connection.query(
        "SELECT * FROM project WHERE projectId = ?;", projectId, 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// :project-id 프로젝트 수정
router.put('/:projectId', (req, res) => {
    let { projectId } = req.params;
    console.log(projectId);
    let name = req.body.projectName;
    console.log(name);
    let desc = req.body.description;
    console.log(desc);
    let state = req.body.projectState;
    console.log(state);
    if(state == "Open") state = 0;
    else if(state == "Closed") state = 1;
    else if(state == "Archived") state = 2;

    let sql = "UPDATE project ";
    sql = sql + "SET projectName = '" + name + "', ";
    sql = sql + "description = '" + desc + "', ";
    sql = sql + "projectState = '" + state + "' ";
    sql = sql + "WHERE projectId = " + projectId + ";";
    connection.query(
        sql, 
        (err, rows, fields) => {
            console.log("success update");
            res.send("success update");
        }
    );
});

// 프로젝트 멤버
// *진행 중*
router.get('/:projectId/members', (req, res) => {
    connection.query(
        "SELECT * FROM project;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 프로젝트 리더
// *진행 중*
router.get('/:projectId/members/leader', (req, res) => {
    connection.query(
        "SELECT * FROM project;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 모든 프로젝트 지원자
// *진행 중*
router.get('/:projectId/applicants', (req, res) => {
    connection.query(
        "SELECT * FROM project;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 프로젝트 지원자 생성
// *진행 중*
router.post('/:projectId/applicants', (req, res) => {
    connection.query(
        "SELECT * FROM project;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 프로젝트 지원자 삭제
// *진행 중*
router.delete('/:projectId/applicants/:user-id', (req, res) => {
    connection.query(
        "SELECT * FROM project;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

module.exports = router;