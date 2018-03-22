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

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/user_basic_info', function (req, res, next) {
    console.log('userid:' + req.cookies.user);
    pool.getConnection(function (err, connection) {
        connection.query(sql.card_name, function (err, cardResult) {
            var cardList = {};
            for (var i = 0; i < cardResult.length; i++) {
                cardList[cardResult[i].cardTypeId] = cardResult[i].cardName;
            }
            console.log(cardList);
            connection.query(sql.get_user_basic_info, [req.cookies.user], function (err, result) {
                result[0].cardType = cardList[result[0].cardType];
                res.send({
                    code: 0,
                    data: result[0]
                });
                connection.release();
                return;
            })
        })
    })
});

module.exports = router;