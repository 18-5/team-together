// BASEURL : ~~~/api/notification

const dotenv = require("dotenv").config({ path: "../.env" });
const express = require('express');
const router = express.Router();
const { serialize } = require('v8');
const controller = require('./notification.controller');

// test
router.get('/test', controller.testNotiPage);

// 회원의 모든 알림
// ?unread=true => 회원의 읽지 않은 알림
// *copmlete*
router.get('/:userId/notifications', controller.userAllAlram);

module.exports = router;
