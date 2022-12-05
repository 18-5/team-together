// BASEURL : ~~~/api/message

const dotenv = require("dotenv").config({ path: "../.env" });
const express = require('express');
const router = express.Router();
const { serialize } = require('v8');
const controller = require('./message.controller');

// test
router.get('/test', controller.testMsgPage);

//-----------------------------------Message-------------------------------------
// 회원의 받은 쪽지
// *complete*
router.get('/:userId/received-messages', controller.userRecievedMsg);

// 회원의 모든 쪽지
// 카톡 채팅방 리스트
// *complete*
router.get('/:userId/messages/all', controller.userAllMsg);

// 회원의 특정 쪽지
// *complete*
router.get('/:userId/messages/:otherId', controller.userMsgByMsgId);

// 회원의 특정 쪽지 삭제
// *진행 중*
router.delete('/:userId/messages/delete/:message-id', controller.deleteMsg);

// 회원에게 쪽지 보내기
// senderId와 receiverId 모두 form으로 post, 화면에서는 두 아이디 모두 안보이도록 숨기기
// messageId는 random 4자리수 * 4자리수
// *complete*
router.post('/:senderId/messages', controller.sendMsg);

module.exports = router;
