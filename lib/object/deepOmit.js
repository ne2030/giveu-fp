const { produce } = require('immer');
const { reduce, curry } = require('fxjs2');

// deepOmit
module.exports = curry((pattern, obj) => produce(obj, (draft) => {
    const lastKey = pattern.pop();
    const target = reduce((o, k) => (o ? o[k] : undefined), draft, pattern);
    if (target) delete target[lastKey];
}));
