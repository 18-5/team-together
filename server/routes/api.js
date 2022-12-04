const express = require('express');
const router = express.Router();

const test= require('./test');
const projectRouter = require('./projects/index');
const usersRouter = require('./users/index');
const authRouter = require('./auth/index');

router.use('/test', test);
router.use('/projects', projectRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);

module.exports = router;
