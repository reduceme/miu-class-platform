var sql = {
    //登录验证
    login: 'select * from admin_user_list where admin_name = ?',
    //获取菜单
    get_menu: 'select * from menu_list where menu_leave in (?)'
};

module.exports = sql;