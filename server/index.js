const api = require('./api');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(api);
app.use(express.static(path.resolve(__dirname, '../dist')));//使用中间件 static 访问静态资源
// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function(req, res) {
        const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
        res.send(html)
    })
    // 监听8088端口
app.listen(8088);
console.log('success listen…………8088');
