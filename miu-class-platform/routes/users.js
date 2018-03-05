var express = require('express');
var mysql = require('mysql');
var $database = require('../config/db');
var sql = require('../config/sql');

//使用连接池
var pool = mysql.createPool($database.mysql);
var router = express.Router();

//向客户端返回JSON数据的的简单封装
function writeJSON(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: 1,
            msg: '操作失败',
            data: ''
        })
    } else {
        res.json({
            code: 0,
            data: ret,
            msg: ''
        });
    }
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//登录接口
router.post('/login', function (req, res, next) {
    //用户名、密码、验证码
    var username = req.body.username;
    var password = req.body.password;

    var sqlStatement = sql.login + username;

    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sqlStatement, function (err, result) {
            if (err) {
                var data = {
                    success: false,
                    data: '',
                    error: err.message
                };
                return res.end(data);
            }

            console.log((password === result[0].password));
            //todo - 密码加密
            if (password === result[0].password) {
                res.cookie('user',username);
                writeJSON(res, []);
            }
            // 释放连接
            connection.release();
        })
    });
});

router.get('/get_timetable', function (req, res, next) {
    var classRoom = req.body.classRoom;
    var classDate = req.body.classDate;
});

module.exports = router;
