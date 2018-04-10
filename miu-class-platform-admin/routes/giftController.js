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
router.post('/get_gift_record', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var sqlStr = sql.get_all_gift_record;
        if(req.body.username !== ''){
            sqlStr = sql.get_detail_gift_record;
        }
        //建立连接
        connection.query(sqlStr, [req.body.username], function (err, result) {
            console.log(result);
            writeJSON(res, result);
            connection.release();
        })
    })
});

module.exports = router;/**
 * Created by d00580 on 2018/4/10.
 */
