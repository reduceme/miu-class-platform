var express = require('express');
var mysql = require('mysql');
//定时器模块
var later = require('later');
//数据库配置
var $database = require('../config/db');
//sql语句
var sql = require('../config/sql');

var pool = mysql.createPool($database.mysql);
var router = express.Router();

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

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

function getTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var time = year + '-' + formatTime(month) + '-' + formatTime(day);
    return time;
}

//格式化时间
function formatTime(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num;
}


router.get('/user_has_class_record', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //查询课表
        connection.query(sql.get_time_table_by_classid, function (err, timeTableResult) {
            connection.query(sql.class_record, [req.cookies.user], function (err, userResult) {
                for (var i = 0; i < userResult.length; i++) {
                    for (var j = 0; j < timeTableResult.length; j++) {
                        if (timeTableResult[j].classId === userResult[i].classId) {
                            userResult[i].classname = timeTableResult[j].classname;
                            userResult[i].time = getTime(userResult[i].time) + ' ' + timeTableResult[j].time;
                        }
                    }
                }
                writeJSON(res, userResult)
            });
        })
    })
});

module.exports = router;