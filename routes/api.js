const express = require('express');
const router = express.Router();

const projectRouter = require('./projects');
const usersRouter = require('./users');

router.use('/projects', projectRouter);
router.use('/users', usersRouter);

module.exports = router;