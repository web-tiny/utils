/*
 * @Author: tiny.jiao@aliyun.com 
 * @Date: 2019-08-22 22:19:00 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-09-04 23:28:44
 */

const SequeLize = require('sequelize');
const config = require('./config');

console.log('init sequelize...');

const formatDate = (t, format = 'yy-mm-dd hh:mm:ss') => {
  const time = new Date(t)
  const paddingZero = data => (data < 10 ? '0' + data : data)

  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = paddingZero(time.getDate())
  const h = paddingZero(time.getHours())
  const mi = paddingZero(time.getMinutes())
  const s = paddingZero(time.getSeconds())

  let outputTime = null
  if (format === 'yy-mm-dd') {
    outputTime = y + '-' + m + '-' + d
  } else if (format === 'yy-mm-dd hh:mm:ss') {
    outputTime = y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + s
  } else if (format === 'yy/mm/dd') {
    outputTime = y + '/' + m + '/' + d
  } else if (format === 'yy/mm/dd hh:mm:ss') {
    outputTime = y + '/' + m + '/' + d + ' ' + h + ':' + mi + ':' + s
  } else if (format === 'hh:mm:ss') {
    outputTime = h + ':' + mi + ':' + s
  } else {
    outputTime = { years: y, mouths: m, days: d, hours: h, minutes: mi, seconds: s }
  }
  return outputTime
}

// 链接数据库
const sequelize = new SequeLize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 3000
  }
});

// 定义模型Pet，告诉SequeLize如何映射数据库
const Pet = sequelize.define('pet', {
  id: {
    type: SequeLize.STRING(50),
    primaryKey: true // primaryKey用于定义主键
  },
  name: SequeLize.STRING(100),
  gender: SequeLize.BOOLEAN,
  birth: SequeLize.STRING(10),
  createdAt: SequeLize.STRING(50),
  updatedAt: SequeLize.STRING(50),
  version: SequeLize.BIGINT
}, {
  timestamps: false
})

let now = Date.now();
// now = formatDate(now)
// 往数据库写入东西
// (async () => {
//   const dog = await Pet.create({
//     id: 'd-'+ now,
//     name: 'Odie',
//     gender: false,
//     birth: '2019-8-24',
//     createdAt: now,
//     updatedAt: now,
//     version: 0
//   });
//   console.log('created:' + JSON.stringify(dog));
// })();

// 查：
Pet.findAll({
  // order: sequelize.literal('max(createdAt) DESC')
}).then(users => {
  console.log('all Users:', JSON.stringify(users, null, 2));
})

/**
 * 改：
 * 更新数据库的某个字段：
 * 将gender为false的值改为0
*/
Pet.update({
  gender: 1
}, {
  // 过滤
  where: {
    gender: 9,
    name: 'tiny'
  }
}).then(()=> {
  console.log('update Done !')
})

// delete 一条
Pet.destroy({
  where: {
    createdAt: 1566533080499
  }
})

// add
Pet.create({
  id: now,
  name: 'jrg',
  gender: false,
  birth: '2008-08-08',
  createdAt: now,
  updatedAt: now,
  version: 0
}).then(function (p) {
  console.log('created.' + JSON.stringify(p));
}).catch(function (err) {
  console.log('failed: ' + err);
});