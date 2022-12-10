const dotenv = require("dotenv").config({ path: "../.env" });
const express = require('express');
const router = express.Router();
const controller = require('./projects.controller');

// 프로젝트 생성
router.post('/', controller.createProject);

// 모든 프로젝트
// ?name-has: 이름을 포함하는 프로젝트 검색
// ?status: 모든 열린 프로젝트
router.get('/', controller.allProjects);

// :project-id 프로젝트
router.get('/:projectId', controller.projectByprojectId);

// :project-id 프로젝트 수정
router.put('/:projectId', controller.updateProject);

// 프로젝트 멤버
router.get('/:projectId/members', controller.projectMember);

// 프로젝트 리더
router.get('/:projectId/members/leader', controller.projectLeader);

// 모든 프로젝트 지원자
router.get('/:projectId/applicants', controller.allCandidate);

// 프로젝트 지원자 생성
// userId는 body로 받아오는 것으로 가정
router.post('/:projectId/applicants', controller.applyCandidate);

// 프로젝트 지원자 삭제
router.delete('/:projectId/applicants/:userId', controller.deleteCandidate);

// 프로젝트 멤버 생성
// userId는 body로 받아오는 것으로 가정
router.post('/:projectId/members', controller.applyMember);

// 프로젝트 멤버 삭제
router.delete('/:projectId/members/:userId', controller.deleteMember);

// 프로젝트 추천
router.get('/recommendation', controller.recommendProject);

module.exports = router;
