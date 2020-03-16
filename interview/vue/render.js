const el = require('./element');

const ul = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item1']),
  el('li', { class: 'item' }, ['Item2']),
  el('li', { class: 'item' }, ['3']),
])

const ulRoot = ul.reader()
document.body.appendChild(ulRoot)