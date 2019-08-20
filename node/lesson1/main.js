/*
 * @Author: Tiny
 * @Date: 2019-08-20 15:10:37
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-20 15:48:19
 */

const fibonacci = n => {
  if (n === 0 || n === 1) {
    return n;
  }
  if (n < 0) {
    throw new Error('n should >= 0');
  }
  if (n > 10) {
    throw new Error('n should <= 10');
  }
  if (typeof n !== 'number') {
    throw new Error('n should be a Number');
  }
  return fibonacci(n-1)+fibonacci(n-2);
}
if (require.main === module) {
  var n = Number(process.argv[2]);
  console.log('fibonacci(' + n + ') is', fibonacci(n));
}

exports.fibonacci = fibonacci;