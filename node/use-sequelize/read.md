##Node.js 操作mysql:
```javascript
1: 链接数据库：mysql -u root -p;
2: 创建数据库： create database tiny_database;
3: 创建用户名：CREATE USER 'tiny'@'%' IDENTIFIED BY '123';
4: 为用户操作某数据库加权限：GRANT ALL PRIVILEGES ON tiny_database. * TO 'tiny'@'%';
5: 创建表：create table user(id int, name varchar(20), age int);
6: 向表里插入初始数据：create table user(id, name, age) values(1, 'tiny', 16);
查看数据库：show databases;
查看数据表：show tables;
查询表里的数据：select * from user;
```
##Error:
###1：ERROR 1044 (42000): Access denied for user ''@'localhost' to database 'mysql'。
```javascript
1).关闭mysql
   \# service mysqld stop
2).屏蔽权限
   \# mysqld_safe --skip-grant-table
   屏幕出现： Starting demo from .....
3).新开起一个终端输入
   \# mysql -u root mysql
   mysql> delete from user where USER='';
   mysql> FLUSH PRIVILEGES; //记得要这句话，否则如果关闭先前的终端，又会出现原来的错误
   mysql> \q
```
###2:failed: SequelizeConnectionError: Client does not support authentication protocol requested by server; consider upgrading MySQL client
```javascript
error原因：
  MySQL8的默认加密方式是：'caching_sha2_password', 而最新的mysql模块并没有完全支持这种加密方式。
解决办法：
  重新修改用户的root密码，并指定mysql模块能支持的加密方式，下面的语句指定了mysql模块支持的mysql_native_password加密方式:
  mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
  Query OK, 0 rows affected (0.12 sec)
```