const dotenv = require("dotenv").config({ path: "../.env" });
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD, 
    port: process.env.DATABASE_PORT, 
    database: process.env.DATABASE_DATABASE, 

    multipleStatements: true
});
connection.connect();

// 프로젝트 생성
exports.createProject = (req, res) => {
    let sql = "INSERT INTO project(createrId, projectName, description, post, intake, projectCreated, projectState, readme)"
        + " VALUES (?, ?, ?, ?, ?, NOW(), 0, ?);";

    let leaderid = req.body.leaderid;
    let name = req.body.projectName;
    console.log(name);
    let desc = req.body.description;
    let post = req.body.post;
    let intake = req.body.intake;
    let readme = req.body.readme;
    console.log(desc);

    let params = [leaderid, name, desc, post, intake, readme];
    connection.query(sql, params, 
        (err, rows, fields) => {
            if(err){
                res.send("query error occured");
                throw err;
            }
            else{
                console.log(rows);
                res.send(rows);

                sql = "SELECT projectId FROM project WHERE createrId=? AND projectName=? AND description=? AND post=? AND intake=? AND readme=?;"
                connection.query(sql, params, 
                    (eerr, rrows, ffields) => {
                        if(eerr){
                            res.send("query error occured at getting projectId");
                            throw err;
                        }
                        else{
                            console.log(rrows[0].projectId);
                            sql = "INSERT INTO member(projectId, userId, leader) VALUES (?, ?, ?);";
                            params = [rrows[0].projectId, leaderid, 1];
    
                            connection.query(sql, params, 
                                (eeerr, rrrows, fffields) => {
                                    if(eeerr){
                                        res.send("query error occured at member insertion")
                                    }
                                    else{
                                        console.log(rrrows);
                                        res.send(rrrows);
                                    }
                                }
                                );
                        }
                    }
                    );
            }
        });
}

// 모든 프로젝트
// ?name-has: 이름을 포함하는 프로젝트 검색
// ?status: 모든 열린 프로젝트
function searchModule(res, pView, ppage, sql_all, sql_created_order, sql_duedate_order, sql_res, sql_m_cnt, sql_a_cnt){
    if(pView == "newest"){
        sql_all += sql_created_order;
    }
    else if(pView == "timesensitive"){
        sql_all += sql_duedate_order;
    }
    if(ppage != undefined){
        sql_all += sql_paging;
    }
    sql_all += ";\n";

    connection.query(
        sql_all, 
        (err, rows, fields) => {
            console.log(rows);
            for(var v in rows){
                console.log(rows[v].projectId);
                sql_res += sql_m_cnt + rows[v].projectId + ";\n";
                sql_res += sql_a_cnt + rows[v].projectId + ";\n";
            }
            console.log(sql_res);
            connection.query(
                sql_res, 
                (eerr, rrows, ffields) => {
                    let size = Object.keys(rows).length
                    console.log(size);
                    for(var i = 0, j = 0; i < size; i++, j+=2){
                        rows[i].numberOfMember = rrows[j][0].mcnt;
                        rows[i].numberOfApplicant = rrows[j + 1][0].acnt;
                    }
                    
                    console.log(rows);
                    res.send(rows);
                }
            );
        }
    );
}

function projectSearch(res, pName, pStatus, pView, ppage){
    let sql_res = "";       // 실제 db 검색할 쿼리문
    let sql_all = "SELECT * FROM project";
    let sql_m_cnt = "SELECT COUNT(*) AS mcnt FROM member m "
        + "WHERE m.projectId = ";
    let sql_a_cnt = "SELECT COUNT(*) AS acnt FROM applicant a "
        + "WHERE a.projectId = ";
    let sql_created_order = " ORDER BY projectCreated DESC"
    let sql_duedate_order = " ORDER BY duedate ASC"
    let sql_paging = " LIMIT " + ((ppage - 1) * 5) +", 5";

    if((pName != undefined) && (pStatus != undefined)) {
        sql_all += " WHERE projectName LIKE '%" + pName
             + "%' AND projectState = " + pStatus;
        searchModule(res, pView, ppage, sql_all, sql_created_order, sql_duedate_order, sql_res, sql_m_cnt, sql_a_cnt);
    }
    else if((pName != undefined) && (pStatus == undefined)) {
        sql_all += " WHERE projectName LIKE '%" + pName + "%'";
        searchModule(res, pView, ppage, sql_all, sql_created_order, sql_duedate_order, sql_res, sql_m_cnt, sql_a_cnt);
    }
    else if((pName == undefined) && (pStatus != undefined)) {
        sql_all += " WHERE projectState = ' " + pStatus + "';";;
        searchModule(res, pView, ppage, sql_all, sql_created_order, sql_duedate_order, sql_res, sql_m_cnt, sql_a_cnt);
    }
    else if((pName == undefined) && (pStatus == undefined)) {
        searchModule(res, pView, ppage, sql_all, sql_created_order, sql_duedate_order, sql_res, sql_m_cnt, sql_a_cnt);
    }
}

// :userid가 지원한 프로젝트 리스트
function appliedProjects(res, userid){
    let sql = "SELECT * FROM project p "
    + "WHERE p.projectId IN "
    + "(SELECT a.projectId FROM applicant a "
    + "WHERE a.userId = ?)"
    + " AND NOT p.projectState=3;";
    connection.query(
        sql, userid, 
        (err, rows, fields) => {
            if(err){
                throw err;
            }
            else{
                console.log(rows);
                res.send(rows);
            }
        }
    )
}

// :userid가 진행 중인 프로젝트 리스트
function ongoingProjects(res, userid){
    let sql = "SELECT p.* FROM project p "
    + "WHERE p.projectId IN "
    + "(SELECT m.projectId FROM member m "
    + "WHERE m.userId = ?) "
    + "AND p.projectState=2;";
    connection.query(
        sql, userid, 
        (err, rows, fields) => {
            console.log(sql);
            if(err){
                throw err;
            }
            else{
                console.log(rows);
                res.send(rows);
            }
        }
    )
}

// :userid가 완료한 프로젝트 리스트
function completedProjects(res, userid){
    let sql = "SELECT p.* FROM project p "
    + "WHERE p.projectId IN "
    + "(SELECT m.projectId FROM member m "
    + "WHERE m.userId = ?) "
    + "AND p.projectState=3;";
    connection.query(
        sql, userid, 
        (err, rows, fields) => {
            if(err){
                throw err;
            }
            else{
                console.log(rows);
                res.send(rows);
            }
        }
    )
}

exports.allProjects = (req, res) => {
    let { userid } = req.query;
    if(userid == undefined){
        let { nameHas, status, view, page } = req.query;
        projectSearch(res, nameHas, status, view, page);
    }
    else if(userid != undefined){
        let { filter } = req.query;
        if(filter == "applied"){
            appliedProjects(res, userid);
        }
        else if(filter == "ongoing"){
            ongoingProjects(res, userid);
        }
        else if(filter == "completed"){
            completedProjects(res, userid);
        }
    }
}

exports.recommendProject = (req, res) => {
    let userId = req.params['userId'];
    console.log(userId);
    
    let sql_random_id = "SELECT * FROM project ORDER BY RAND() LIMIT 1;";
    let sql_res = "";
    let sql_m_cnt = "SELECT COUNT(*) AS mcnt FROM member m "
        + "WHERE m.projectId = ";
    let sql_a_cnt = "SELECT COUNT(*) AS acnt FROM applicant a "
        + "WHERE a.projectId = ";

    connection.query(
        sql_random_id, 
        (err, rows, fields) => {
            console.log(rows);
            for(var v in rows){
                console.log(rows[v].projectId);
                sql_res += sql_m_cnt + rows[v].projectId + ";\n";
                sql_res += sql_a_cnt + rows[v].projectId + ";\n";
            }
            console.log(sql_res);
            connection.query(
                sql_res, 
                (eerr, rrows, ffields) => {
                    let size = Object.keys(rows).length
                    console.log(size);
                    for(var i = 0, j = 0; i < size; i++, j+=2){
                        rows[i].numberOfMember = rrows[j][0].mcnt;
                        rows[i].numberOfApplicant = rrows[j + 1][0].acnt;
                    }
                    
                    console.log(rows);
                    res.send(rows);
                }
            );
        }
    );
}

// :project-id 프로젝트
exports.projectByprojectId = (req, res) => {
    let projectId = req.params['projectId'];
    console.log(projectId);

    connection.query(
        "SELECT * FROM project WHERE projectId = ?;", projectId, 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
}

// :project-id 프로젝트 수정
exports.updateProject = (req, res) => {
    let sql = "UPDATE project SET projectName=?, description=?, post=?, intake=?, projectState=?, readme=?, duedate=? WHERE projectId = ?;";

    let projectId = req.params['projectId'];
    let name = req.body.projectName;
    console.log(name);
    let desc = req.body.description;
    let post = req.body.post;
    let intake = req.body.intake;
    console.log(desc);
    let state = req.body.status;
    let duedate = req.body.duedate;
    let readme = req.body.readme;

    let params = [name, desc, post, intake, state, readme, duedate, projectId];
    connection.query(sql, params, 
        (err, rows, fields) => {
            if(err){
                res.send("query error occured");
                throw err;
            }
            else{
                console.log(rows);
                res.send(rows);
            }
        });
}

// 프로젝트 멤버
exports.projectMember = (req, res) => {
    let projectId = req.params['projectId'];
    console.log(projectId);

    let sql = "SELECT * FROM user WHERE userId IN "
        + "(SELECT userId FROM member WHERE projectId=" + projectId + ");";
    connection.query(
        sql, 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
}

// 프로젝트 리더
exports.projectLeader = (req, res) => {
    let projectId = req.params['projectId'];
    console.log(projectId);

    let sql = "SELECT * FROM user WHERE userId IN "
        + "(SELECT userId FROM member WHERE projectId=" + projectId + " AND "
        + "leader=1);";
    connection.query(
        sql, 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
}

// 모든 프로젝트 지원자
exports.allCandidate = (req, res) => {
    let projectId = req.params['projectId'];
    console.log(projectId);

    let sql = "SELECT * FROM user WHERE userId IN "
        + "(SELECT userId FROM applicant WHERE projectId=" + projectId + ");";
    connection.query(
        sql, 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        }
    );
}

// 프로젝트 지원자 생성
// userId는 body로 받아오는 것으로 가정
exports.applyCandidate = (req, res) => {
    let userId = req.body.userId;
    console.log(userId);
    let sql = "SELECT COUNT(*) FROM user WHERE userId=" + userId + ";";
    connection.query(sql, (err, rows, fields) => {
        if(rows != 0){
            sql = "INSERT INTO applicant VALUES (?, ?);";
            let projectId = req.params['projectId'];
            console.log(projectId);
        
            let params = [projectId, userId];
            connection.query(sql, params, 
                (err, rows, fields) => {
                    console.log(rows);
                    res.send(rows);
                });
        }
        else{
            console.log("Not Existing User")
            res.send("Not Existing User");
        }
    })
}

// 프로젝트 지원자 삭제
exports.deleteCandidate = (req, res) => {
    let projectId = req.params['projectId'];
    let userId = req.params['userId'];
    console.log(projectId);
    console.log(userId);

    let sql = "DELETE FROM applicant WHERE projectId=" + projectId
        + " AND userId=" + userId + ";";

    connection.query(
        sql, 
        (err, rows, fields) => {
            if(err){
                console.log("delete fail");
                res.send("delete fail");    
            }
            console.log("delete success");
            res.send("delete success");
        }
    );
}

// 프로젝트 멤버 생성
// userId는 body로 받아오는 것으로 가정
exports.applyMember = (req, res) => {
    console.log("applyMember");
    let userId = req.body.userId;
    console.log(userId);
    let sql = "SELECT COUNT(*) FROM user WHERE userId=" + userId + ";";
    connection.query(sql, (err, rows, fields) => {
        if(rows != 0){
            sql = "INSERT INTO member(projectId, userId, leader) VALUES (?, ?, ?);";
            let projectId = req.params['projectId'];
            console.log(projectId);
        
            let params = [projectId, userId, 0];
            console.log(params);
            connection.query(sql, params, 
                (eerr, rrows, ffields) => {
                    console.log(rrows);
                    res.send(rrows);
                });
        }
        else{
            console.log("Not Existing User")
            res.send("Not Existing User");
        }
    })
}

// 프로젝트 멤버 삭제
exports.deleteMember = (req, res) => {
    let projectId = req.params['projectId'];
    let userId = req.params['userId'];
    console.log(projectId);
    console.log(userId);

    let sql = "DELETE FROM member WHERE projectId=" + projectId
        + " AND userId=" + userId + ";";

    connection.query(
        sql, 
        (err, rows, fields) => {
            if(err){
                console.log("delete fail");
                res.send("delete fail");    
            }
            console.log("delete success");
            res.send("delete success");
        }
    );
}