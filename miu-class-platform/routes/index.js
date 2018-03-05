var express = require('express');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '登录' });
});

module.exports = router;