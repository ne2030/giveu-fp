const curryr = require('../etc/curryr');

// get
module.exports = curryr((from, selector) => selector
    .replace(/\[([^[\]]*)\]/g, '.$1.')
    .split('.')
    .filter(t => t !== '')
    .reduce((prev, cur) => prev && prev[cur], from));
