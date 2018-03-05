var express = require('express');
var mysql = require('mysql');
var $database = require('../database/db');
var $util = require('../util/util');

//使用连接池
var pool = mysql.createPool($util.extend({}, $database.mysql));

var router = express.Router();

//向客户端返回JSON数据的的简单封装
/*function writeJSON(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: 1,
            msg: '操作失败'
        })
    }else {
        res.json(ret);
    }
}*/

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//登录接口
router.post('/login', function (req, res, next) {
    //用户名、密码、验证码
    var username = req.body.username;
    var password = req.body.password;

    if (username === 'admin' && password === '123456') {
        res.cookie('user', username);
        return res.send({
            code: 1
        })
    }

    return res.send({
        code: 0,
        msg: '用户名或账号错误'
    })
});

module.exports = router;
