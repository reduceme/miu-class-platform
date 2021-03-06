var express = require('express');
var mysql = require('mysql');
//定时器模块
var later = require('later');
//数据库配置
var $database = require('../config/db');
//sql语句
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

//获取教师列表
router.post('/get_teacher_list', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_teacher_list_for_manage, [req.body.status], function (err, result) {
            writeJSON(res, result);
            connection.release();
        })
    })
});

//设置老师的有效状态
router.post('/set_teacher_status', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.update_teacher_status, [req.body.status, req.body.userid], function (err, result) {
            if (result.protocol41) {
                writeJSON(res, result.protocol41);
            }else {
                writeJSON(res)
            }
            connection.release();
        })
    })
});

//添加老师
router.post('/add_teacher', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.add_teacher, [req.body.name, req.body.username, req.body.password, req.body.status], function (err, result) {
            if (result.protocol41) {
                writeJSON(res, result.protocol41);
            }else {
                writeJSON(res)
            }
            connection.release();
        })
    })
});

module.exports = router;