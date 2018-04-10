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

//获取赠卡记录
router.post('/get_card_record', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var sqlStr = sql.get_all_card_record;
        if (req.body.username !== '') {
            sqlStr = sql.get_detail_card_record;
        }
        //建立连接
        connection.query(sqlStr, [req.body.username], function (err, result) {
            writeJSON(res, result);
            connection.release();
        })
    })
});

router.get('/get_card_record', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        //建立连接
        connection.query(sql.get_all_card_list, function (err, result) {
            var cardList = {};
            for (var i = 0; i < result.length; i++) {
                cardList[result[i].cardTypeId] = result[i].cardName
            }
            writeJSON(res, cardList);
            connection.release();
        })
    })
});

module.exports = router;
