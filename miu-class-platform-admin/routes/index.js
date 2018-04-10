var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '登录'});
});

router.get('/user-list', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('index', {title: '登录'})
    }
    res.render('user-list', {title: '会员管理'});
});

router.get('/teacher-list', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('index', {title: '登录'})
    }
    res.render('teacher-list', {title: '教师列表'});
});

router.get('/card-type', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('index', {title: '登录'})
    }
    res.render('card-type', {title: '卡种设置'});
});

router.get('/timetable', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('index', {title: '登录'})
    }
    res.render('timetable', {title: '课表设置'});
});

router.get('/reser-record', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('index', {title: '登录'})
    }
    res.render('reser-record', {title: '预约信息'});
});

router.get('/gift-info', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('index', {title: '登录'})
    }
    res.render('gift-info', {title: '赠卡记录'});
});

router.get('/card-record', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('index', {title: '登录'})
    }
    res.render('card-record', {title: '续卡记录'});
});

module.exports = router;