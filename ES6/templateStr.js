/*
 * @Author: Tiny 
 * @Date: 2020-03-16 17:08:41 
 * @Last Modified by: tiny.jiao@aliyun.com
 * @Last Modified time: 2020-03-16 17:53:53
 */
/**
 * 模板字符串:
 */
/**
 * 模版标签:
 * 模版字符串紧跟在一个函数名后面,该函数将被调用来处理这个模版字符串
 * 可以考虑使用common-tags插件(https://github.com/zspecza/common-tags)
 */
// const oneLine = (template, ...expressions) => {
//   console.log(template, ...expressions)
//   let result = template.reduce((pre, next, i) => pre + expressions[i -1] + next)
//   result = result.replace(/\n\s*/g, '').trim();
//   return result;
// };
const oneLine = (template, ...expressions) => template.reduce((pre, next, i) => pre + expressions[i -1] + next).replace(/\n\s*/g, '').trim();
let message = oneLine `
    Hi,
    Daisy!
    I am
    Kevin.
`;
console.log(message);

const stripIndents = (template, ...expressions) => template.reduce((pre, next, i) => pre + expressions[i -1] + next).replace(/^[^\S\n]+/gm, '').trim();
let html = stripIndents `
	<span>1</span>
	<span>2</span>
		<span>3</span>
`;
console.log(html)

const stripIndent = (template, ...expressions) => {
  let result = template.reduce((pre, next, i) => pre + expressions[i -1] + next)
  
  const match = result.match(/^[^\S\n]*(?=\S)/gm)
  console.log(match)
  const indent = match && Math.min(...match.map(el => el.length))
  console.log(indent)

  if (indent) {
    const regexp = new RegExp(`^.{${indent}}`, 'gm')
    console.log(regexp)
    result = result.replace(regexp, '')
  }
  result = result.trim();
  return result;
}
let htmlUl = stripIndent `
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
          <ul>
`;
console.log(htmlUl)