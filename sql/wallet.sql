create database `walletProject`;

use walletProject;

# 用户表
create table `wallet_accounts`(
    id int unsigned primary key auto_increment comment '主键',
    `address` varchar(34) not null comment '钱包地址',
    `password` varchar(32) not null comment 'md5的，AES的明文钥'
)engine=myisam charset=utf8;


# 钱包文件表
create table `wallet_dat` (
    id int unsigned primary key comment '外键',
    content text not null comment 'aes的密文的明文要进行第3次加密'
)engine=myisam charset=utf8;