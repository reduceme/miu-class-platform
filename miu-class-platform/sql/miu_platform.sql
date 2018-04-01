/*
 Navicat Premium Data Transfer

 Source Server         : miuyoga_class_platform
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : miu_platform

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 01/04/2018 15:18:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user_list
-- ----------------------------
DROP TABLE IF EXISTS `admin_user_list`;
CREATE TABLE `admin_user_list`  (
  `admin_id` int(64) NOT NULL AUTO_INCREMENT COMMENT '管理员id',
  `admin_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员名称',
  `teacher_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `admin_leave` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '权限等级',
  `admin_status` int(32) NOT NULL COMMENT '状态码：1.有效 2.无效',
  PRIMARY KEY (`admin_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_user_list
-- ----------------------------
INSERT INTO `admin_user_list` VALUES (1, '18030850749', '戴瑞', '123456', '1', 1);
INSERT INTO `admin_user_list` VALUES (2, '15902827532', '钟妙', '827532', '2', 1);
INSERT INTO `admin_user_list` VALUES (3, '18030851243', '叶洪英', '851243', '2', 2);
INSERT INTO `admin_user_list` VALUES (4, '13699097908', '戴生林', '097908', '2', 2);

-- ----------------------------
-- Table structure for card_type_info
-- ----------------------------
DROP TABLE IF EXISTS `card_type_info`;
CREATE TABLE `card_type_info`  (
  `cardTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `cardName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cardCount` int(255) NOT NULL,
  `cardValidity` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `card_limit` int(32) NOT NULL COMMENT '卡种权限：1.普通次卡或年卡 2.孕妇卡 3.产后卡',
  PRIMARY KEY (`cardTypeId`) USING BTREE,
  INDEX `cardName`(`cardName`) USING BTREE,
  INDEX `cardCount`(`cardCount`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40002 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of card_type_info
-- ----------------------------
INSERT INTO `card_type_info` VALUES (1, '半年卡', 500, '183', 1);
INSERT INTO `card_type_info` VALUES (2, '30次卡', 30, '183', 1);
INSERT INTO `card_type_info` VALUES (3, '50次卡', 50, '244', 1);
INSERT INTO `card_type_info` VALUES (4, '100次卡', 100, '365', 1);
INSERT INTO `card_type_info` VALUES (40001, 'test', 10, '10', 1);

-- ----------------------------
-- Table structure for class_room
-- ----------------------------
DROP TABLE IF EXISTS `class_room`;
CREATE TABLE `class_room`  (
  `roomId` int(64) NOT NULL AUTO_INCREMENT,
  `classroom` varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`roomId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30000 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of class_room
-- ----------------------------
INSERT INTO `class_room` VALUES (1, 'Miuyoga瑜伽工作室（光华逸家）');
INSERT INTO `class_room` VALUES (2, 'Miuyoga瑜伽工作室（南湖逸家）');
INSERT INTO `class_room` VALUES (3, 'Miuyoga瑜伽工作室（南阳锦城）');

-- ----------------------------
-- Table structure for gift_member_number
-- ----------------------------
DROP TABLE IF EXISTS `gift_member_number`;
CREATE TABLE `gift_member_number`  (
  `userid` int(64) NOT NULL,
  `gift_count` int(64) NOT NULL,
  `gift_time` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gift_member_number
-- ----------------------------
INSERT INTO `gift_member_number` VALUES (10007, 12, '2018-03-31 15:30');

-- ----------------------------
-- Table structure for menu_list
-- ----------------------------
DROP TABLE IF EXISTS `menu_list`;
CREATE TABLE `menu_list`  (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单ID',
  `menu_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单 名称',
  `menu_href` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '链接地址',
  `menu_leave` int(255) NOT NULL COMMENT '菜单等级',
  `menu_icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'icon',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu_list
-- ----------------------------
INSERT INTO `menu_list` VALUES (1, '会员管理', '/user-list', 2, 'fa fa-database');
INSERT INTO `menu_list` VALUES (2, '教师管理', '/teacher-list', 1, 'fa fa-database');
INSERT INTO `menu_list` VALUES (3, '卡种设置', '/card-type', 1, 'fa fa-database');

-- ----------------------------
-- Table structure for teacher_list
-- ----------------------------
DROP TABLE IF EXISTS `teacher_list`;
CREATE TABLE `teacher_list`  (
  `teacher_id` int(64) NOT NULL AUTO_INCREMENT COMMENT '教师id',
  `teacher_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '教师姓名',
  `teacher_status` int(64) NOT NULL COMMENT '在职状态：1.有效   2.无效',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '联系方式',
  PRIMARY KEY (`teacher_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher_list
-- ----------------------------
INSERT INTO `teacher_list` VALUES (1, '妙', 1, '15902827532');

-- ----------------------------
-- Table structure for timetable
-- ----------------------------
DROP TABLE IF EXISTS `timetable`;
CREATE TABLE `timetable`  (
  `classId` int(11) NOT NULL AUTO_INCREMENT,
  `roomId` int(11) NOT NULL,
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `teacher` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `week` int(11) NOT NULL,
  `maxCount` int(11) NOT NULL,
  `minCount` int(11) NOT NULL,
  `classname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `swipeNumber` int(64) NOT NULL,
  `classType` int(64) NOT NULL,
  PRIMARY KEY (`classId`) USING BTREE,
  INDEX `for_roomid`(`roomId`) USING BTREE,
  CONSTRAINT `for_roomid` FOREIGN KEY (`roomId`) REFERENCES `class_room` (`roomId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 20005 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of timetable
-- ----------------------------
INSERT INTO `timetable` VALUES (1, 1, '10:00', '毛毛老师', 1, 5, 2, '空中瑜伽', 'true', 2, 1);
INSERT INTO `timetable` VALUES (2, 1, '10:01', '毛毛老师', 2, 5, 2, '初级瑜伽', 'true', 1, 1);
INSERT INTO `timetable` VALUES (3, 1, '10:03', '毛毛老师', 3, 5, 2, '高温瑜珈', 'true', 2, 1);
INSERT INTO `timetable` VALUES (4, 1, '10:04', '毛毛老师', 4, 5, 2, '肩颈理疗', 'true', 2, 1);
INSERT INTO `timetable` VALUES (5, 1, '10:05', '毛毛老师', 5, 5, 2, '入门瑜伽', 'true', 2, 1);
INSERT INTO `timetable` VALUES (6, 1, '10:06', '毛毛老师', 6, 5, 2, '流瑜伽', 'true', 2, 1);
INSERT INTO `timetable` VALUES (8, 1, '19:30', '蛋蛋老师', 3, 5, 2, '拜日式', 'true', 2, 1);
INSERT INTO `timetable` VALUES (20000, 1, '15:50', '钟', 5, 5, 2, '球', 'true', 2, 1);
INSERT INTO `timetable` VALUES (20001, 1, '18:55', 'd', 5, 5, 2, 'd', 'true', 2, 1);
INSERT INTO `timetable` VALUES (20002, 1, '15:00', 'd', 2, 5, 2, 'da', 'true', 2, 1);
INSERT INTO `timetable` VALUES (20003, 1, '19:20', 'test', 2, 5, 2, 'dd', 'true', 2, 1);

-- ----------------------------
-- Table structure for update_card_type
-- ----------------------------
DROP TABLE IF EXISTS `update_card_type`;
CREATE TABLE `update_card_type`  (
  `user_id` int(32) NOT NULL COMMENT '用户id',
  `update_time` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '升级时间',
  `prev_card_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '以前的卡种类型',
  `now_card_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '现在的卡种leixing',
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '备注信息',
  `manage_id` int(64) NOT NULL COMMENT '操作人员'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user_class_info
-- ----------------------------
DROP TABLE IF EXISTS `user_class_info`;
CREATE TABLE `user_class_info`  (
  `userId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cardCount` int(11) NOT NULL,
  `isEffective` int(11) NOT NULL COMMENT '1：开课；2：未开课；3：用户取消课程；4：不满足开课条件，系统自动取消课程'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_class_info
-- ----------------------------
INSERT INTO `user_class_info` VALUES (10007, 4, '2018-03-29', 2, 3);
INSERT INTO `user_class_info` VALUES (10011, 1, '2018-04-02', 2, 1);
INSERT INTO `user_class_info` VALUES (10007, 1, '2018-04-02', 2, 3);
INSERT INTO `user_class_info` VALUES (10007, 2, '2018-04-03', 1, 3);

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户登陆的账号',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `customerName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '会员姓名',
  `userid` int(255) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '会员ID',
  `cardType` int(64) NOT NULL COMMENT '会员卡种',
  `totalCount` int(64) NOT NULL COMMENT '总次数',
  `lastCount` int(64) NOT NULL COMMENT '剩余次数',
  `lastTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '截止时间',
  `openTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '开卡时间',
  `createTime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '创建时间',
  `createRoom` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '办卡地点',
  `createTeacher` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '业务员',
  PRIMARY KEY (`userid`) USING BTREE,
  INDEX `for_total_count`(`totalCount`) USING BTREE,
  INDEX `for_card_type`(`cardType`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10013 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('18030850749', '123456', '戴瑞', 10007, 1, 500, 412, '2018-04-14', '2018-03-22', '2018-03-20', '1', '1');
INSERT INTO `user_info` VALUES ('15902827532', '827532', '钟妙', 10010, 1, 500, 500, NULL, NULL, '2018-03-31', '1', '1');
INSERT INTO `user_info` VALUES ('18030851243', '851243', '叶洪英', 10011, 1, 500, 498, '2018-09-30', '2018-03-31', '2018-03-31', '1', '1');

SET FOREIGN_KEY_CHECKS = 1;
