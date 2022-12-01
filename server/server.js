const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 5050;

const apiRouter = require('./routes/api');

// 5000 포트로 서버 오픈
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
})

app.get("/api", (req, res) => {
    res.send(__dirname);
});

app.use('/api', apiRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
