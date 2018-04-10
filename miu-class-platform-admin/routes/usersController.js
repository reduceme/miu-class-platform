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

//登录接口
router.post('/login', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.login, [req.body.admin_id], function (err, result) {
            //todo - 密码加密
            if (result.length >= 1 && result[0].admin_status === 1) {
                //验证密码是否正确
                if (req.body.password === result[0].password) {
                    res.cookie('user', result[0].admin_id, {
                        //过期时间，1小时
                        maxAge: 60 * 60 * 1000
                    });

                    res.cookie('leave', result[0].admin_leave, {
                        //过期时间，1小时
                        maxAge: 60 * 60 * 1000
                    });

                    var leaveList = {
                        '1': [1, 2, 3],
                        '2': [2, 3],
                        '3': [3]
                    };
                    //返回菜单
                    connection.query(sql.get_menu, [leaveList[req.cookies.leave]], function (err, menuResult) {
                        res.send({
                            code: 0,
                            msg: '',
                            data: menuResult
                        });
                        connection.release();
                    })
                } else {
                    writeJSON(res);
                    connection.release();
                }
            } else {
                writeJSON(res);
                connection.release();
            }
        });
    });
});

//查询卡种
router.get('/get_card_type_list', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_card_type_list, function (err, cardTypeList) {
            var item = {};
            for (var i = 0; i < cardTypeList.length; i++) {
                item[cardTypeList[i].cardTypeId] = cardTypeList[i].cardName;
            }
            writeJSON(res, item);
            connection.release();
        })
    })
});

//获取会员列表
router.get('/get_user_list', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_user_list, function (err, result) {
            writeJSON(res, result);
            connection.release();
        })
    })
});

//上课详情
router.post('/get_user_class_detail', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_user_class_detail, [req.body.userId], function (err, result) {
            writeJSON(res, result);
        })
    })
});

//查询人员
router.post('/get_special_user', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_special_user, [req.body.username, req.body.customerName, req.body.lastTime], function (err, result) {
            writeJSON(res, result);
            connection.release();
        })
    })
});

//新建会员时查询卡种
router.get('/get_card_type_for_create_member', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_card_type_list, function (err, cardTypeList) {
            writeJSON(res, cardTypeList);
            connection.release();
        })
    })
});

//新建会员时查询教室
router.get('/get_classroom', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_classroom, function (err, result) {
            writeJSON(res, result);
            connection.release();
        })
    })
});

//新建会员时查询教师列表
router.get('/get_teacher_list', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_teacher_list, function (err, result) {
            writeJSON(res, result);
            connection.release();
        })
    })
});

//新建会员
router.post('/create_member', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.create_member, [req.body.username, req.body.password, req.body.customerName, req.body.cardType, req.body.totalCount, req.body.totalCount, req.body.createTime, req.body.createRoom, req.body.createTeacher], function (err, result) {
            writeJSON(res, []);
            connection.release();
        })
    })
});

//赠送次数
router.post('/gift_count', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.gift_count, [req.body.userid, req.body.count, req.body.time, req.body.remark, req.cookies.user], function (err, result) {
            connection.query(sql.update_last_count, [req.body.count, req.body.userid], function (err, result) {
                writeJSON(res, []);
                connection.release();
            })
        })
    })
});

//会员续卡、升级卡等操作
router.post('/update_customer_card', function (req, res, next) {
    pool.getConnection(function (err, connection) {

        connection.query(sql.create_update_card_history, [req.body.userid, req.body.time, req.body.prevType, req.body.nowType, req.body.remark, req.cookies.user], function (err, result) {
            //建立连接
            connection.query(sql.update_customer_card, [req.body.nowType, req.body.totalCount, req.body.totalCount, req.body.lastTime, req.body.userid], function (err, result) {
                writeJSON(res, result);
                connection.release();
            })
        });
    })
});

module.exports = router;