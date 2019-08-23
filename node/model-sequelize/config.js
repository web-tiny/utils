/*
 * @Author: Tiny 
 * @Date: 2019-08-23 16:14:13 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-23 17:20:56
 */

// 配置文件入口
// config files:
const defaultConfig = './config-default.js';
const overrideConfig = './config-override.js';
const testConfig = './config-test.js';

const fs = require('fs');

let config = null;

if (process.env.NODE_ENV === 'test') {
  console.log(`Load${testConfig}...`);
  config = require(testConfig);
} else {
  console.log(`Load${defaultConfig}...`);
  config = require(defaultConfig);
  try {
    if (fs.statSync(overrideConfig).isFile()) {
      console.log(`Load${overrideConfig}...`);
      config = Object.assign(config, require(overrideConfig))
    }
  } catch (err) {
    console.log(`Cannot load ${overrideConfig}.`);
  }
}

module.exports = config;