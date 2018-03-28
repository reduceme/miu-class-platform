var sql = {
    //登录验证
    login: 'select * from admin_user_list where admin_name = ?',
    //获取菜单
    get_menu: 'select * from menu_list where menu_leave in (?)',
    //获取会员列表
    get_user_list: 'select username, customerName, cardType, totalCount, lastCount, lastTime, openTime, createTime, createRoom, createTeacher, userId from user_info',
    //获取卡种类型
    get_card_type_list: 'select cardTypeId, cardName from card_type_info',
    //课程详情
    get_user_class_detail: 'select u_c.classId, u_c.time, t_t.classname, t_t.time as t_t_minute from user_class_info u_c inner join timetable t_t on u_c.classId = t_t.classId where u_c.userId = ?',
    //根据电话或者姓名查询
    get_special_user: 'select username, customerName, cardType, totalCount, lastCount, lastTime, openTime, createTime, createRoom, createTeacher, userId from user_info where `username` = ? or `customerName` = ?'
};

module.exports = sql;