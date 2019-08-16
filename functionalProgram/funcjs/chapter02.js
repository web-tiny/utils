/*
 * @Author: Tiny
 * @Date: 2019-08-15 13:20:47
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2019-08-15 15:19:08
 */
const _ = require('lodash');
// import { existy } from './index';

const users = [
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred', 'age': 40 },
  { 'user': 'pebbles', 'age': 5 }
];
const sortUsers = _.chain(users)
  .sortBy('age')
  .value();
console.log(sortUsers)

let lyrics = [];
for (let i = 99; i > 0; i--) {
  lyrics.push(i + 'i of beer on the wall');
  lyrics.push(i + 'i of beer');
  lyrics.push('Take on down, pass it around');

  i > 1 ? lyrics.push((i - 1) + 'i of beer on the wall.') : lyrics.push('No more bottles of beer on the wall !')
}
// console.log(lyrics);
const lyricsSegment = n => _.chain([])
  .push(n + 'i of beer on the wall')
  .push(n + 'i of beer')
  .push('Take on down, pass it around')
  .tap(lyrics => n > 1 ? lyrics.push((n - 1) + 'i of beer on the wall.') : lyrics.push('No more bottles of beer on the wall !'))
  .value()
console.log(lyricsSegment(90));

const song = (start, end, lyricsGen) => _.reduce(_.range(start, end), (acc, n) => acc.concat(lyricsGen(n)), []);
console.log(song(0, 10, n => n * 2));

const doubleAll = arr => _.map(arr, n => n * 2);
const average = arr => {
  const sum = _.reduce(arr, (a, b) => a + b);
  return sum / _.size(arr)
}
const nums = [1, 2, 3, 4, 5];
console.log(average(nums));
console.log(doubleAll(nums));
const onlyEven = arr => _.filter(arr, n => n%2 === 0);
console.log(onlyEven(nums))

const allOf = (...rest) => _.reduceRight(rest, (truth, f) => truth && f(), true);
const complement = pred => (...rest) => !pred.apply(null, _.toArray(rest));

const existy = x => x !== null;
function cat () {
  const head = _.first(arguments);
  return existy(head) ? head.concat.apply(head, _.rest(arguments)) : []
}
console.table(cat([1,2,3], [4,5], [6,7,8]));
