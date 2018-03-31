var sql = {
    //登录验证
    login: 'select * from admin_user_list where admin_name = ?',
    //获取菜单
    get_menu: 'select * from menu_list where menu_leave in (?)',
    //获取会员列表
    get_user_list: 'select userid, username, customerName, cardType, totalCount, lastCount, lastTime, openTime, createTime, createRoom, createTeacher, userId from user_info',
    //获取卡种类型
    get_card_type_list: 'select cardTypeId, cardName, cardCount from card_type_info',
    //课程详情
    get_user_class_detail: 'select u_c.classId, u_c.isEffective, u_c.time, t_t.classname, t_t.time as t_t_minute from user_class_info u_c inner join timetable t_t on u_c.classId = t_t.classId where u_c.userId = ?',
    //根据电话或者姓名查询
    get_special_user: 'select userid, username, customerName, cardType, totalCount, lastCount, lastTime, openTime, createTime, createRoom, createTeacher, userId from user_info where `username` = ? or `customerName` = ? or `lastTime` <= ?',
    //教室查询
    get_classroom: 'select roomId, classroom from class_room',
    //获取教师列表
    get_teacher_list: 'select teacher_id, teacher_name from teacher_list where teacher_status = 1',
    //创建会员
    create_member: 'insert into user_info (`username`, `password`, `customerName`, `cardType`, `totalCount`, `lastCount`, `createTime`, `createRoom`, `createTeacher`) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    //赠送次数
    gift_count: 'insert into gift_member_number (`userid`, `gift_count`, `gift_time`) values (?, ?, ?)',
    //更新会员的剩余次数
    update_last_count: 'update user_info set `lastCount` = `lastCount` + ? where userid = ?',
    //教师管理界面-获取教师列表
    get_teacher_list_for_manage: 'select teacher_id, teacher_name, teacher_leave, phone from teacher_list where `teacher_status` = ?'
};

module.exports = sql;