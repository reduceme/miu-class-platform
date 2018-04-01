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
    get_teacher_list: 'select admin_id, teacher_name from admin_user_list where admin_status = 1',
    //创建会员
    create_member: 'insert into user_info (`username`, `password`, `customerName`, `cardType`, `totalCount`, `lastCount`, `createTime`, `createRoom`, `createTeacher`) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    //赠送次数
    gift_count: 'insert into gift_member_number (`userid`, `gift_count`, `gift_time`) values (?, ?, ?)',
    //更新会员的剩余次数
    update_last_count: 'update user_info set `lastCount` = `lastCount` + ? where userid = ?',
    //教师管理界面-获取教师列表
    get_teacher_list_for_manage: 'select admin_id, teacher_name, admin_name from admin_user_list where `admin_status` = ?',
    //设置老师的有效状态
    // update_teacher_status: 'update teacher_list set `teacher_status` = ? where teacher_id = ?',
    update_teacher_status: 'update admin_user_list set `admin_status` = ? where admin_id = ?',
    //添加老师
    add_teacher: 'insert into admin_user_list (`teacher_name`, `admin_name`, `password`, `admin_status`, `admin_leave`) values (?, ?, ?, ?, 2)',
    //会员续卡、升级卡
    update_customer_card: 'update user_info set `cardType` = ? , `totalCount` = `totalCount` +  ?, `lastCount` = `lastCount` + ?, `lastTime` = ? where `userid` = ?',
    //升级卡的操作记录
    create_update_card_history: 'insert into update_card_type (`user_id`, `update_time`, `prev_card_type`, `now_card_type`, `remark`, `manage_id`) values (?, ?, ?, ?, ?, ?)',
    //获取卡种类型-卡种设置
    get_card_list: 'select cardTypeId, cardName, cardCount, cardValidity, card_limit from card_type_info',
    //添加卡种
    create_card_type: 'insert into card_type_info (`cardName`, `cardCount`, `cardValidity`, `card_limit`) values (?, ?, ?, ?)',
    //修改卡种信息
    update_card_type: 'update card_type_info set `cardName` = ?, `cardCount` = ?, `cardValidity` = ?, `card_limit` = ? where `cardTypeId` = ?'
};

module.exports = sql;