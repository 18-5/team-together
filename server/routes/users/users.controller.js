const dotenv = require("dotenv").config({ path: "../.env" });
const mysql = require("mysql");
const { serialize } = require("v8");

//console.log(process.env.DATABASE_HOST);

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_DATABASE,
});
connection.connect();

exports.testUserPage = (req, res) => {
  res.send("test user page");
};

// 회원 가입
/*exports.signIn = (req, res) => {
  let sql =
    "INSERT INTO user(userId, userPW, userEmail, userHomepage, userSchool, userBio)" +
    " VALUES (?, ?, ?, ?, ?, ?, ?);";
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
  connection.query(sql, params, (err, rows, fields) => {
    if (err) {
      res.send(err);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
};*/

// 회원가입
exports.signIn = (req, res) => {
  let id = req.body.userId;
  let pw = req.body.userPw;
  let name = req.body.userName;
  let email = req.body.userEmail;
  let sql = "INSERT INTO user(userId, userPwd, userName, userEmail) VALUES(?, ?, ?, ?);";
  let params = [id, pw, name, email];

  connection.query(
    sql, params,
    (err, rows, fields) => {
      if (err) {
        res.send(err);
      } else {
        res.send(rows)
      }
    }
  )
};

// 프로필 수정
exports.updateUser = (req, res) => {
  let userId = req.params["userId"];
  let sql =
    `UPDATE user SET userBio=?, userEmail=?, userHomepage=?, userSchool=? WHERE userId=${userId};`;

  let bio = req.body.userBio;
  console.log(bio);
  let email = req.body.userEmail;
  console.log(email);
  let homepage = req.body.userHomepage;
  console.log(homepage);
  let school = req.body.userSchool;
  console.log(school);

  let params = [bio, email, homepage, school];
  connection.query(sql, params, (err, rows, fields) => {
    if (err) {
      res.send(err);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
};

// 내가 리더인 프로젝트
// *complete*
exports.whereUserIsLeader = (req, res) => {
  let userId = req.params["userId"];
  let sql =
    "SELECT * FROM project WHERE projectId IN (SELECT projectId FROM member WHERE userId = " +
    userId +
    " AND leader = 1);";

  connection.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
};

// :user-id 회원 프로필
// *complete*
exports.userProfile = (req, res) => {
  let userId = req.params["userId"];
  console.log(userId);

  connection.query(
    "SELECT * FROM user WHERE userId =" + userId + ";",
    (err, rows, fields) => {
      console.log(rows);
      res.send(rows);
    }
  );
};

// 회원의 모든 팔로워들
// *데이터 베이스 테이블 추가 필요*
exports.allFollowers = (req, res) => {
  connection.query("SELECT * FROM user;", (err, rows, fields) => {
    console.log(rows);
    res.send(rows);
  });
};

// 회원의 모든 프로젝트
// 회원의 모든 프로젝트 중 현재 열린 프로젝트
// *complete*
exports.userAllProjects = (req, res) => {
  let userId = req.params["userId"];
  console.log(userId);

  let sql =
    "SELECT * FROM project WHERE projectState=0 AND projectId IN (SELECT projectId FROM member WHERE userId = " +
    userId +
    ");";

  connection.query(sql, (err, rows, fields) => {
    if (err) {
      res.send(err);
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
};

// 회원의 리뷰들
// *진행 중*
exports.userReviews = (req, res) => {
  connection.query("SELECT * FROM user;", (err, rows, fields) => {
    console.log(rows);
    res.send(rows);
  });
};

// 회원 평가하기
// 평가하는 사람 Id, 평가받는 사람 Id는 url로 보내기
// 평가값은 순서대로 qualitative = 개발실력, attitude = 태도, responsibility = 책임감, compatibility = 협동성
// *complete*
exports.evaluateUser = (req, res) => {
  let userId = req.params['userId'];
  let otherId = req.params['otherId'];
  let qualitative = req.body.qualitative;
  let attitude = req.body.attitude;
  let responsibility = req.body.responsibility;
  let compatibility = req.body.compatibility;

  let dbQualitative;
  let dbQuantitative;
  let dbAttitude;
  let dbResponsibility;
  let dbCompatibility;

  let sql = "SELECT EXISTS(SELECT * FROM teamther.evaluation WHERE evaluatedUserId = " + otherId + ") AS result";
  let sql2 = "";
  let sql3 = "";
  connection.query(
    sql,
    (err, rows, fields) => {
      let result = JSON.stringify(rows[0].result).toString();
      if (err) {
        res.send(err);
      } else {
        if (result === '1') {// 평가받는 user가 존재할 때 
          // db에서 업데이트 하고싶은 값 받아오기
          sql2 += "SELECT qualitative AS dbQualitative, "
            + "quantitative AS dbQuantitative, "
            + "attitude AS dbAttitude, "
            + "responsibility AS dbResponsibility, "
            + "compatibility AS dbCompatibility FROM evaluation "
            + "WHERE evaluatedUserId = " + otherId + ";";

          connection.query(
            sql2,
            (err, rows, fields) => {
              if (err) {
                res.send(err);
              }
              else {
                dbQualitative = JSON.stringify(rows[0].dbQualitative).toString();
                dbQuantitative = JSON.stringify(rows[0].dbQuantitative).toString();
                dbAttitude = JSON.stringify(rows[0].dbAttitude).toString();
                dbResponsibility = JSON.stringify(rows[0].dbResponsibility).toString();
                dbCompatibility = JSON.stringify(rows[0].dbCompatibility).toString();


                // db에서 받아온 값 숫자로 변환
                dbQuantitative = Number(dbQuantitative); // 지금까지 평가한 사람 수

                dbQualitative = Number(dbQualitative) * dbQuantitative;
                dbAttitude = Number(dbAttitude) * dbQuantitative;
                dbResponsibility = Number(dbResponsibility) * dbQuantitative;
                dbCompatibility = Number(dbCompatibility) * dbQuantitative;

                // evaluater 수 +1
                dbQuantitative += 1;

                // db에서 받아온 값 + 새로 입력된 값
                dbQualitative += Number(qualitative);
                dbAttitude += Number(attitude);
                dbResponsibility += Number(responsibility);
                dbCompatibility += Number(compatibility);

                // evaluater수로 나눠서 평균내기
                dbQualitative = dbQualitative / dbQuantitative;
                dbAttitude = dbAttitude / dbQuantitative;
                dbResponsibility = dbResponsibility / dbQuantitative;
                dbCompatibility = dbCompatibility / dbQuantitative;

                // db에 업데이트
                sql3 = "UPDATE evaluation SET "
                  + "qualitative = " + dbQualitative
                  + ", quantitative = " + dbQuantitative
                  + ", attitude = " + dbAttitude
                  + ", responsibility = " + dbResponsibility
                  + ", compatibility = " + dbCompatibility
                  + " WHERE evaluatedUserId = " + otherId + ";";

                connection.query(
                  sql3,
                  (err, rows, fields) => {
                    if (err) {
                      res.send(err);
                    } else {
                      res.send(rows);
                    }
                  }
                )
              }
            }
          )
        }
        else {// 평가받는 user가 db에 없을 때 새로 INSERT
          sql2 += "INSERT INTO evaluation VALUES (?, ?, ?, ?, ?, ?, ?)";
          let params = [userId, otherId, qualitative, 1, attitude, responsibility, compatibility];
          connection.query(
            sql2, params,
            (err, rows, fields) => {
              if (err) {
                res.send("errorfinal");
              } else {
                res.send(rows);
              }
            }
          )
        }
      }
    }
  )
}
// 회원에게 리뷰 달기
// *진행 중*
exports.writeReview = (req, res) => {
  connection.query("SELECT * FROM user;", (err, rows, fields) => {
    console.log(rows);
    res.send(rows);
  });
};
