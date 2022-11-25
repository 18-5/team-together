const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5050;

const apiRouter = require('./routes/api');

// 5000 포트로 서버 오픈
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api", (req, res) => {
    res.send("Hello World!");
    console.log("hello");
});

app.use('/api', apiRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));