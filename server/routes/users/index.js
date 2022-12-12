// BASEURL : ~~~/api/users

const dotenv = require("dotenv").config({ path: "../.env" });
const express = require('express');
const router = express.Router();
const { serialize } = require('v8');
const controller = require('./users.controller');

// test
router.get('/', controller.testUserPage);

// 회원 가입
router.post('/', controller.signIn);

router.put('/:userId', controller.updateUser);

// 내가 리더인 프로젝트
// *complete*
router.get('/:userId/leader', controller.whereUserIsLeader);

// :user-id 회원 프로필
// *complete*
router.get('/:userId', controller.userProfile);


// 회원의 모든 팔로워들
// *데이터 베이스 테이블 추가 필요*
router.get('/:userId/followers', controller.allFollowers);

// 회원의 모든 프로젝트
// 회원의 모든 프로젝트 중 현재 열린 프로젝트
// *complete*
router.get('/:userId/projects', controller.userAllProjects);

// 회원의 리뷰들
// *진행 중*
router.get('/:userId/reviews', controller.userReviews);

// 상호평가
// 필요한 데이터 form으로 보내기
// 순서대로 개발실력(qualitative), 태도(attitude), 책임감(responsibility), 협동성(compatibility)
// *진행 중*
router.post('/:userId/evaluateUser/:otherId', controller.evaluateUser);

/*
//-----------------------------------Message-------------------------------------
// 회원의 모든 알림
// ?unread=true => 회원의 읽지 않은 알림
// *copmlete*
router.get('/:userId/notifications', controller.userAllAlram);

// 회원의 받은 쪽지
// *complete*
router.get('/:userId/received-messages', controller.userReceivedMsg);

// 회원의 모든 쪽지
// 카톡 채팅방 리스트
// *complete*
router.get('/:userId/messages/all', controller.userAllMsg);

// 회원의 특정 쪽지
// *complete*
router.get('/:userId/messages/:otherId', controller.userMsgByMsgId);

// 회원의 특정 쪽지 삭제
// *진행 중*
router.delete('/:userId/messages/delete/:messageId', controller.deleteMsg);

// 회원에게 쪽지 보내기
// senderId와 receiverId 모두 form으로 post, 화면에서는 두 아이디 모두 안보이도록 숨기기
// messageId는 random 4자리수 * 4자리수
// *complete*
router.post('/:senderId/messages', controller.sendMsg);
*/

module.exports = router;
