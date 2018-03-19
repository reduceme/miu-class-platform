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

function getTime(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var week = date.getDay();

    var hours = date.getHours() + 1;
    var minute = date.getMinutes();
    var time = year + '-' + formatTime(month) + '-' + formatTime(day);
    var complate = formatTime(hours) + ':' + formatTime(minute);

    var format = {
        //2018-03-10
        time: time,
        //15:00
        complate: complate,
        //3
        week: week
    };

    return format;
}

//格式化时间
function formatTime(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num;
}

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

//登录接口
router.post('/login', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var data = [];
        //建立连接
        connection.query(sql.login, [req.body.username], function (err, result) {
            //todo - 密码加密
            if (result.length >= 1) {
                console.log((result[0].userid));
                //验证密码是否正确
                if (req.body.password === result[0].password) {
                    res.cookie('user', result[0].userid, {
                        //过期时间，1小时
                        maxAge: 60 * 60 * 1000
                    });
                }

                //验证卡是否在有效期内，卡是否还有次数
                var time = getTime(new Date()).time;
                if (result[0].lastTime < time || result[0].lastCount <= 0) {
                    res.send({
                        code: 1,
                        msg: '用户已过期',
                        data: ''
                    });
                    connection.release();
                    return;
                } else {
                    writeJSON(res, []);
                    connection.release();
                    return;
                }
            } else {
                writeJSON(res);
                connection.release();
                return;
            }
        });
    });
});

//获取教室信息
router.get('/get_class_room', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.classRoom, function (err, result) {
            writeJSON(res, result);
            // 释放连接
            connection.release();
        })
    });
});

//获取课表
router.post('/get_timetable', function (req, res, next) {
    //建立连接
    pool.getConnection(function (err, connection) {
        connection.query(sql.timeTable, [req.body.roomId, req.body.week], function (err, result) {
            writeJSON(res, result);
            // 释放连接
            connection.release();
        })
    })
});

//获取某节课预约人数
router.post('/get_reserved_count', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(sql.get_reserved_count, [req.body.time, req.body.classIdList], function (err, result) {
            var data = [];
            for (var i = 0; i < req.body.classIdList.length; i++) {
                data[i] = {};
                var count = 0;
                var key = req.body.classIdList[i];
                for (var j = i; j < result.length; j++) {
                    if (result[j].classId === key && result[j].isEffective === 1) {
                        count++;
                    }
                    if (result[j].classId === key && result[j].isEffective === 1 && Number(req.cookies.user) === Number(result[j].userId)) {
                        data[i].hasReservation = result[j].isEffective;
                    } else {
                        data[i].hasReservation = 0;
                    }
                }
                data[i]['count'] = count;
                data[i]['classId'] = key;
            }

            writeJSON(res, data);
            connection.release();
        });
    })
});

//用户预约课程
router.post('/user_reservation_class', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var lastCount = 0;
        //每节课的刷卡次数
        var classSwipeNum = req.body.swipeNumber;
        //查询用户是否还有可用次数
        connection.query(sql.select_user_card_valid, [req.cookies.user], function (err, result) {
            lastCount = result[0].lastCount;

            if (lastCount > classSwipeNum) {
                //预约成功
                connection.query(sql.user_reservation_class, [req.cookies.user, req.body.classId, req.body.time, classSwipeNum], function (err, reserv_result) {
                });

                //扣除相应次数
                connection.query(sql.update_last_count, [classSwipeNum, req.cookies.user], function (err, reserv_result) {
                    writeJSON(res, []);
                    connection.release();
                });
            } else {
                res.send({
                    code: 1,
                    msg: '剩余次数不足，请及时续卡',
                    data: ''
                });
                connection.release();
            }
        });
    })
});

//用户取消课程
router.post('/cancle_class', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(sql.cancle_class, [req.cookies.user, req.body.classId, req.body.time], function (err, result) {
        });

        connection.query(sql.update_last_count, [-req.body.swipeNumber, req.cookies.user], function (err, result) {
            writeJSON(res, []);
            connection.release();
        });
    })
});

//定时任务，每天的某个时间查询约课人数，判断是否约课成功
var composite = [
    {h: [9], m: [0]},
    {h: [14], m: [0]},
    {h: [17], m: [20]},
    {h: [18], m: [30]}
];

var sched = {
    schedules: composite
};

later.date.localTime();

//定时任务
var t = later.setInterval(function () {
    var time = getTime(new Date());
    var classid = [];
    var minCount = 0;
    //查询指定时间的课程的约课人数，如果不满足开课要求，则删除
    pool.getConnection(function (err, connection) {
        var swipeNumber = 0;
        var count = 0;
        var userIdList = [];

        //查询课程的classId
        connection.query(sql.select_classinfo_for_reservation, [time.week, time.complate], function (err, result) {
            if (result[0].classId) {
                classid.push(result[0].classId);
                minCount = result[0].minCount;
                //课程扣除的次数
                swipeNumber = result[0].swipeNumber
            } else {
                return
            }

            //查询约课人数
            connection.query(sql.get_reserved_count, [time.time, classid], function (err, result) {
                //约课人数
                count = result.length;
                for (var i = 0; i < result.length; i++) {
                    userIdList.push(result[i].userId);
                }
                if (count < minCount) {
                    //删除已经预约了的信息
                    connection.query(sql.delete_min_count, [classid, time.complate], function (err, result) {
                        //恢复已经扣除的次数
                        connection.query(sql.update_last_count, [-swipeNumber, userIdList], function (err, result) {
                        });
                    });
                }
                connection.release();
            });
        });
    })
}, sched);

module.exports = router;