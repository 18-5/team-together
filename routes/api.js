const express = require('express');
const router = express.Router();

const projectRouter = require('./routes/projects');
const usersRouter = require('./routes/users');

router.use('/projects', projectRouter);
router.use('/users', usersRouter);

module.exports = router;