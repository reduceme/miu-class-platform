var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '登录'});
    // res.render('time-table', {test: timeTableList});
});

router.get('/time-table', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('index', {title: '登录'})
    }
    res.render('time-table', {title: 'MiuYoga会员约课系统'});
});

router.get('/user-info', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('index', {title: '登录'})
    }
    res.render('user-info', {title: '个人中心'});
});

router.get('/class-record', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('index', {title: '登录'})
    }
    res.render('class-record', {title: '课程记录'});
});

module.exports = router;