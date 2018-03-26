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
            if (result.length >= 1) {
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
                    connection.query(sql.get_menu, [leaveList[req.cookies.leave]], function (err, menuResult) {
                        console.log(menuResult);
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

//获取菜单列表
/*router.post('/get_menu', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var leaveList = {
            '1': [1, 2, 3],
            '2': [2, 3],
            '3': [3]
        };
        //建立连接
        connection.query(sql.get_menu, [leaveList[req.cookies.leave]], function (err, result) {
            writeJSON(result);
            connection.release();
        })
    })
});*/

module.exports = router;