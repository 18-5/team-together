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

// 회원에게 리뷰 달기
// *진행 중*
router.post('/:userId/projects', controller.writeReview);

module.exports = router;
