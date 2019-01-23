const { produce } = require('immer');
const { reduce, match, head } = require('fxjs2');
const isArray = require('../etc/isArray');
const isObject = require('../etc/isObject');

const createObj = (keys, val) => {
    keys = isArray(keys) ? keys : keys.split('.');
    const obj = {};
    const lastKey = keys.pop();

    const lastObj = reduce((acc, k) => acc[k] = {}, obj, keys);
    lastObj[lastKey] = val;
    return obj;
};

// set
module.exports = (keys, val) => produce((draft) => {
    keys = isArray(keys) ? keys : keys.split('.');
    const lastKey = keys.pop();
    const target = reduce((o, k) => o && o[k], draft, keys);

    if (target) target[lastKey] = val;
});
