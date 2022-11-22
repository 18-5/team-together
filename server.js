const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const apiRouter = require('./routes/api');

// 5000 포트로 서버 오픈
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', apiRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));