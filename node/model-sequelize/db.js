/*
 * @Author: Tiny 
 * @Date: 2019-08-23 16:13:32 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-23 17:13:14
 */
// 如何定义model

const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const config = require('./config');

console.log('init sequelize...');

const generateId = () => uuid.v4();

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const ID_TYPE = Sequelize.STRING(50);

const defineModel = (name, attributes) => {
  let attr = {};
  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      const value = attributes[key];
      if (typeof value === 'object' && value['type']) {
        value.allowNull = value.allowNull || false;
        attr[key] = value;
      } else {
        attr[key] = {
          type: value,
          allowNull: false
        }
      }
    }
    attr.id = {
      type: ID_TYPE,
      primaryKey: true
    };
    attr.createdAt = {
      type: Sequelize.BIGINT,
      allowNull: false
    };
    attr.updatedAt = {
      type: Sequelize.BIGINT,
      allowNull: false
    };
    attr.version = {
      type: Sequelize.BIGINT,
      allowNull: false
    };
    console.log('model defined for table:' + name + '\n' + JSON.stringify(attr, (k, v) => {
      if (k === 'type') {
        for (const key in Sequelize) {
          if (Sequelize.hasOwnProperty(key)) {
            if (key === 'ABSTACT'|| key === 'NUMBER') {
              continue;
            }
            const dbType = Sequelize[key];
            if (typeof dbType === 'function') {
              if (v instanceof dbType) {
                if (v._length) {
                  return `${dbType.key}(${v._length})`
                }
                return dbType.key;
              }
              if (v === dbType) {
                return dbType.key;
              }
            }
          }
        }
      }
      return v;
    }, ' '));
    return sequelize.define(name, attr, {
      tableName: name,
      timestamp: false,
      hooks: {
        beforeValidate(obj) {
          let now = Date.now();
          if (obj.isNewRecord) {
            console.log('will create entity...' + obj);
            if (!obj.id) {
              obj.id = generateId();
            }
            obj.createdAt = now;
            obj.updatedAt = now;
            obj.version = 0;
          } else {
            console.log('will update entity...');
            obj.updatedAt = now;
            obj.version++;
          }
        }
      }
    })
  }
}

const exp = {
  defineModel,
  sync: () => {
    // only allow create ddl in non-production environment:
    if (process.env.NODE_ENV !=='production') {
      sequelize.sync({ force: true });
    } else {
      throw new Error('Can not sync() when NODE_ENV is set to \' poduction\'.');
    }
  }
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];
for (const type of TYPES) {
  exp[type] = Sequelize[type];
}
exp.id = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;