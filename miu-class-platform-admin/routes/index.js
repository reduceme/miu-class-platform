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
    res.render('/teacher-list', {title: '教师列表'});
});

module.exports = router;