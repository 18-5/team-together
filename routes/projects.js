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
    connection.query(
        "SELECT * FROM project;", 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
});

// 모든 프로젝트
// ?name-has: 이름을 포함하는 프로젝트 검색
// ?status: 모든 열린 프로젝트
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