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
    let sql = "INSERT INTO project VALUES (?, ?, ?, NOW());";
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
    connection.query(
        "SELECT * FROM project;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// :project-id 프로젝트
// *진행 중*
router.get('/:project-id', (req, res) => {
    connection.query(
        "SELECT * FROM project;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// :project-id 프로젝트 수정
// *진행 중*
router.put('/:project-id', (req, res) => {
    connection.query(
        "SELECT * FROM project;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 프로젝트 멤버
// *진행 중*
router.get('/:project-id/members', (req, res) => {
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
router.get('/:project-id/members/leader', (req, res) => {
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
router.get('/:project-id/applicants', (req, res) => {
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
router.post('/:project-id/applicants', (req, res) => {
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
router.delete('/:project-id/applicants/:user-id', (req, res) => {
    connection.query(
        "SELECT * FROM project;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

module.exports = router;