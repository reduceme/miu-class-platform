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

//获取卡种列表
router.get('/get_card_list', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_card_list, function (err, result) {
            writeJSON(res, result);
            connection.release();
        })
    })
});

//添加卡种
router.post('/create_card_type', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.create_card_type, [req.body.cardName, req.body.cardCount, req.body.cardValidity, req.body.cardType,], function (err, result) {
            if (result.protocol41) {
                writeJSON(res, result.protocol41);
            } else {
                writeJSON(res)
            }
            connection.release();
        })
    })
});

//修改卡种
router.post('/update_card_type', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.update_card_type, [req.body.cardName, req.body.cardCount, req.body.cardValidity, req.body.cardType, req.body.cardTypeId], function (err, result) {
            if (result.protocol41) {
                writeJSON(res, result.protocol41);
            } else {
                writeJSON(res)
            }
            connection.release();
        })
    })
});

module.exports = router;