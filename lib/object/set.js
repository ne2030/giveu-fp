const { produce } = require('immer');
const { reduce } = require('fxjs2');
const isArray = require('../etc/isArray');

// set
module.exports = (keyRaw, val) => produce((draft) => {
    const keys = isArray(keyRaw) ? keyRaw : keyRaw.split('.');
    const lastKey = keys.pop();
    const target = reduce((o, k) => o && o[k], draft, keys);

    if (target) target[lastKey] = val;
});
