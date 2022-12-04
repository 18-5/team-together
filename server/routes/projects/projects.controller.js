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
    let sql = "INSERT INTO project VALUES (?, ?, ?, NOW(), 0, ?);";
    let id = req.body.projectId;
    console.log(id);
    let name = req.body.projectName;
    console.log(name);
    let desc = req.body.description;
    let readme = req.body.readme;
    console.log(desc);

    let params = [id, name, desc, readme];
    connection.query(sql, params, 
        (err, rows, fields) => {
            console.log(rows);
            res.send(rows);
        });
}

// 모든 프로젝트
// ?name-has: 이름을 포함하는 프로젝트 검색
// ?status: 모든 열린 프로젝트
exports.allProjects = (req, res) => {
    let { nameHas, status, view } = req.query;

    let sql_res = "";       // 실제 db 검색할 쿼리문
    let sql_all = "SELECT * FROM project";
    let sql_m_cnt = "SELECT COUNT(*) FROM member m ";
        + "WHERE m.projectId = "
        + "(SELECT projectId FROM project p ";
    let sql_a_cnt = "SELECT COUNT(*) FROM applicant a "
        + "WHERE a.projectId = "
        + "(SELECT projectId FROM project p ";
    let sql_order = " ORDER BY projectCreated"

    if((nameHas != undefined) && (status != undefined)) {
        sql_all += " WHERE projectName LIKE '%" + nameHas
             + "%' AND projectState = " + status;
        if(view == "newest"){
            sql_all += sql_order;
        }
        sql_all += ";\n";

        sql_m_cnt += "WHERE p.projectName LIKE '%" + nameHas + "%' AND "
            + "p.projectState = " + status + ");\n";

        sql_a_cnt += "WHERE p.projectName LIKE '%" + nameHas + "%' AND "
            + "p.projectState = " + status + ");";

        sql_res = sql_all + sql_m_cnt + sql_a_cnt;
        console.log(sql_res);
        connection.query(
            sql_res, 
            (err, rows, fields) => {
                console.log(rows);
                res.send(rows);
            }
        );
    }
    else if((nameHas != undefined) && (status == undefined)) {
        sql_all += " WHERE projectName LIKE '%" + nameHas + "%'";
        if(view == "newest"){
            sql_all += sql_order;
        }
        sql_all += ";\n";

        sql_m_cnt += "WHERE p.projectName LIKE '%" + nameHas + "%');\n";

        sql_a_cnt += "WHERE p.projectName LIKE '%" + nameHas + "%');";

        sql_res = sql_all + sql_m_cnt + sql_a_cnt;
        console.log(sql_res);
        connection.query(
            sql_res, 
            (err, rows, fields) => {
                console.log(rows);
                res.send(rows);
            }
        );
    }
    else if((nameHas == undefined) && (status != undefined)) {
        sql_all += " WHERE projectState = ' " + status + "';";;
        if(view == "newest"){
            sql_all += sql_order;
        }
        sql_all += ";\n";

        sql_m_cnt += " WHERE p.projectState = " + status + ");\n";

        sql_a_cnt += " WHERE p.projectState = " + status + ");";

        sql_res = sql_all + sql_m_cnt + sql_a_cnt;
        console.log(sql_res);
        connection.query(
            sql_res, 
            (err, rows, fields) => {
                console.log(rows);
                res.send(rows);
            }
        );
    }
    else if((nameHas == undefined) && (status == undefined)) {
        if(view == "newest"){
            sql_all += sql_order;
        }
        sql_all += ";\n";
        let sql_getId = "SELECT projectId FROM project;";
        connection.query(
            sql_getId, 
            (err, rows, fields) => {
                console.log(rows);
                let sql_m = "";
                let sql_a = "";
                for(var v in rows){
                    console.log(rows[v].projectId);
                    sql_m += "SELECT COUNT(*) FROM member m "
                    + "WHERE m.projectId = " + rows[v].projectId + ";\n";
                    sql_a += "SELECT COUNT(*) FROM applicant a "
                    + "WHERE a.projectId = " + rows[v].projectId + ";\n";
                }
                sql_res = sql_all + ";\n" + sql_m + sql_a
                console.log(sql_res);
                connection.query(
                    sql_res, 
                    (err, rows, fields) => {
                        console.log(rows);
                        res.send(rows);
                    }
                );
            }
        )
    }
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
