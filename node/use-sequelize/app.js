/*
 * @Author: tiny.jiao@aliyun.com 
 * @Date: 2019-08-22 22:19:00 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-22 23:41:31
 */

const SequeLize = require('sequelize');
const config = require('./config');

console.log('init sequelize...');

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
const Pet = sequelize.difine('pet', {
  id: {
    type: SequeLize.STRING(50),
    primaryKey: true
  },
  name: SequeLize.STRING(100),
  gender: SequeLize.BOOLEAN,
  birth: SequeLize.STRING(10),
  createdAt: SequeLize.BIGINT,
  updatedAt: SequeLize.BIGINT,
  version: SequeLize.BIGINT
}, {
  timestamps: false
})

let now = Date.now();

Pet.create({
  id: 'g-' + now,
  name: 'Gaffey',
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

// 往数据库写入东西
(async () => {
  const dog = await Pet.create({
    id: 'd-'+ now,
    name: 'Odie',
    gender: false,
    birth: '2019-8-24',
    createdAt: now,
    updatedAt: now,
    version: 0
  });
  console.log('created:' + JSON.stringify(dog));
})();

(async () => {
  const pets = await Pet.findAll({
    where: {
      name: 'TianMei'
    }
  });
  console.log(`find ${pets.length} pets:`);
  for (const p of pets) {
    console.log(JSON.stringify(p));
    console.log('update pet...');
    p.gender = true;
    p.updatedAt = Date.now();
    p.version ++;
    if (p.version === 3) {
      await p.destroy();
      console.log(`${p.name} was destroyed.`);
    }
  }
})();
