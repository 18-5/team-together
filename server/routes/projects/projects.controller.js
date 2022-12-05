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
    let sql = "INSERT INTO project(projectName, description, projectCreated, projectState)"
        + " VALUES (?, ?, NOW(), 0);";

    let name = req.body.projectName;
    console.log(name);
    let desc = req.body.description;
    let readme = req.body.readme;
    console.log(desc);

    let params = [name, desc, readme];
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
    let sql_duedate_order = " ORDER BY duedate DESC"
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

exports.allProjects = (req, res) => {
    let { nameHas, status, view, page } = req.query;

    projectSearch(res, nameHas, status, view, page);


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
    let projectId = req.params['projectId'];
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
        + "admin=1);";
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
