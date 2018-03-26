/*
 Navicat MySQL Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : miu_platform

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 23/03/2018 17:30:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for card_type_info
-- ----------------------------
DROP TABLE IF EXISTS `card_type_info`;
CREATE TABLE `card_type_info`  (
  `cardTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `cardName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cardCount` int(255) NOT NULL,
  `cardValidity` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`cardTypeId`) USING BTREE,
  INDEX `cardName`(`cardName`) USING BTREE,
  INDEX `cardCount`(`cardCount`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40000 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of card_type_info
-- ----------------------------
INSERT INTO `card_type_info` VALUES (1, '半年卡', 500, '183');
INSERT INTO `card_type_info` VALUES (2, '30次卡', 30, '183');
INSERT INTO `card_type_info` VALUES (3, '50次卡', 50, '244');
INSERT INTO `card_type_info` VALUES (4, '100次卡', 100, '365');

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
  PRIMARY KEY (`classId`) USING BTREE,
  INDEX `for_roomid`(`roomId`) USING BTREE,
  CONSTRAINT `for_roomid` FOREIGN KEY (`roomId`) REFERENCES `class_room` (`roomId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 20004 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of timetable
-- ----------------------------
INSERT INTO `timetable` VALUES (1, 1, '10:00', '毛毛老师', 1, 5, 2, '空中瑜伽', 'true', 2);
INSERT INTO `timetable` VALUES (2, 1, '10:01', '毛毛老师', 2, 5, 2, '初级瑜伽', 'true', 1);
INSERT INTO `timetable` VALUES (3, 1, '10:03', '毛毛老师', 3, 5, 2, '高温瑜珈', 'true', 2);
INSERT INTO `timetable` VALUES (4, 1, '10:04', '毛毛老师', 4, 5, 2, '肩颈理疗', 'true', 2);
INSERT INTO `timetable` VALUES (5, 1, '10:05', '毛毛老师', 5, 5, 2, '入门瑜伽', 'true', 2);
INSERT INTO `timetable` VALUES (6, 1, '10:06', '毛毛老师', 6, 5, 2, '流瑜伽', 'true', 2);
INSERT INTO `timetable` VALUES (8, 1, '19:30', '蛋蛋老师', 3, 5, 2, '拜日式', 'true', 2);
INSERT INTO `timetable` VALUES (20000, 1, '15:50', '钟', 5, 5, 2, '球', 'true', 2);
INSERT INTO `timetable` VALUES (20001, 1, '18:55', 'd', 5, 5, 2, 'd', 'true', 2);
INSERT INTO `timetable` VALUES (20002, 1, '15:00', 'd', 2, 5, 2, 'da', 'true', 2);
INSERT INTO `timetable` VALUES (20003, 1, '19:20', 'test', 2, 5, 2, 'dd', 'true', 2);

-- ----------------------------
-- Table structure for user_class_info
-- ----------------------------
DROP TABLE IF EXISTS `user_class_info`;
CREATE TABLE `user_class_info`  (
  `userId` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `time` date NOT NULL,
  `cardCount` int(11) NOT NULL,
  `isEffective` int(11) NOT NULL COMMENT '1：开课；2：未开课；3：用户取消课程；4：不满足开课条件，系统自动取消课程'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_class_info
-- ----------------------------
INSERT INTO `user_class_info` VALUES (10007, 5, '2018-03-23', 2, 3);
INSERT INTO `user_class_info` VALUES (10007, 20000, '2018-03-23', 2, 1);
INSERT INTO `user_class_info` VALUES (10007, 3, '2018-03-28', 2, 1);
INSERT INTO `user_class_info` VALUES (10007, 20001, '2018-03-23', 2, 1);

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
  PRIMARY KEY (`userid`) USING BTREE,
  INDEX `for_total_count`(`totalCount`) USING BTREE,
  INDEX `for_card_type`(`cardType`) USING BTREE,
  CONSTRAINT `for_card_type` FOREIGN KEY (`cardType`) REFERENCES `card_type_info` (`cardTypeId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `for_total_count` FOREIGN KEY (`totalCount`) REFERENCES `card_type_info` (`cardCount`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 10008 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES ('18030850749', '123456', '戴瑞', 10007, 1, 500, 484, '2018-09-21', '2018-03-22', '2018-03-20');

SET FOREIGN_KEY_CHECKS = 1;
