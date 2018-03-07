var express = require('express');
var router = express.Router();

var timeTableList = [{
    time: '10:00',
    classname: '空中瑜伽',
    teacher: '妙妙老师',
    hasReservation: '1',
    lastReservation: '2',
    classId: '1'
}, {
    time: '15:00',
    classname: '产后修复',
    teacher: '妙妙老师',
    hasReservation: '1',
    lastReservation: '2',
    classId: '2'
}, {
    time: '18:30',
    classname: '初级瑜伽',
    teacher: '妙妙老师',
    hasReservation: '1',
    lastReservation: '2',
    classId: '3'
}];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '登录'});
    // res.render('time-table', {test: timeTableList});
});

router.get('/time-table', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('index', {title: '登录'})
    }
    // res.render('time-table', {timeTableList: timeTableList});
    res.render('time-table', {title: '课表'});
});

module.exports = router;