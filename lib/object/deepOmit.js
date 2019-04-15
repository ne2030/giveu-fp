const { produce } = require('immer');
const { reduce, curry } = require('fxjs2');

const isArray = require('../etc/isArray');

// deepOmit
module.exports = curry((pattern, obj) => produce(obj, (draft) => {
    const omit = (keyStr) => {
        const keys = keyStr.split('.');
        const lastKey = keys.pop();
        const target = reduce((o, k) => (o ? o[k] : undefined), draft, keys);
        if (target) delete target[lastKey];
    };

    if (isArray(pattern)) pattern.map(omit);
    else omit(pattern);
}));
