// BASEURL : ~~~/api/auth

const dotenv = require("dotenv").config({ path: "../.env" });
const express = require('express');
const router = express.Router();
const { serialize } = require('v8');
const controller = require('./auth.controller');

// test
router.get('/test', controller.testAuthPage);

// 로그인 확인
// ?id,pw: 로그인 성공 여부를 확인하고 해당 id, pw를 갖는 user의 정보 반환
router.post('/', controller.checkLogin);

module.exports = router;
