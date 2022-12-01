const express = require('express');
const router = express.Router();

const projectRouter = require('./projects');
const usersRouter = require('./users');
const test= require('./test');

router.use('/projects', projectRouter);
router.use('/users', usersRouter);
router.use('/test', test);

module.exports = router;