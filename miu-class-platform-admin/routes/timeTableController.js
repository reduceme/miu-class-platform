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

//获取课程表
router.post('/get_timetable', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_timetable, [req.body.roomId], function (err, result) {
            writeJSON(res, result);
            connection.release();
        })
    })
});

//获取教室信息
router.get('/get_classroom', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_classroom, function (err, result) {
            writeJSON(res, result);
            connection.release();
        })
    })
});

//获取指定的课程信息
router.post('/get_special_class', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_special_class, [req.body.classId], function (err, result) {
            writeJSON(res, result[0]);
            connection.release();
        })
    })
});

//获取老师列表
router.get('/get_teacher_list', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_teacher_list_for_manage, ['1'], function (err, result) {
            writeJSON(res, result);
            connection.release();
        })
    })
});

router.post('/insert_new_class', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.insert_new_class, [req.body.roomId, req.body.time, req.body.teacher, req.body.week, req.body.maxCount, req.body.minCount, req.body.classname, req.body.swipeNumber, req.body.classType], function (err, result) {
            if (result.protocol41) {
                connection.query(sql.delete_class_info, [req.body.classId], function (err, delResult) {
                    writeJSON(res, delResult.protocol41);
                    connection.release();
                })
            } else {
                writeJSON(res);
                connection.release();
            }

        })
    })
});

router.post('/delete_class_info', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.delete_class_info, [req.body.classId], function (err, delResult) {
            writeJSON(res, delResult.protocol41);
            connection.release();
        })
    })
});

module.exports = router;