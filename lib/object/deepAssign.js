const { produce } = require('immer');
const { reduce } = require('fxjs2');

const isString = require('../etc/isString');

// deepAssign
module.exports = (keys, value) => produce((draft) => {
    keys = isString(keys) ? keys.split('.') : keys;
    const lastKey = keys.pop();
    const target = reduce((deep, cur) => deep[cur], draft, keys);
    target[lastKey] = Object.assign(target[lastKey], value);
});
