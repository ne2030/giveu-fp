const { produce } = require('immer');
const { reduce, match } = require('fxjs2');
const isArray = require('../etc/isArray');
const isObject = require('../etc/isObject');

const createObj = (keys, val) => {
    const lastKey = keys.pop();
    const obj = reduce((o, k) => (o[k] = {}, o), {}, keys);
    obj[lastKey] = val;
    return obj;
};

// set
module.exports = (keys, val) => produce((draft) => {
    keys = isArray(keys) ? keys : keys.split('.');
    const lastKey = keys.pop();
    let conflict = false;
    const target = reduce((o, k) => {
        if (!o) return o;
        if (k in o) return isObject(o[k]) ? o[k] : (conflict = true, null);
    }, draft, keys);
    if (target) target[lastKey] = val;
});
