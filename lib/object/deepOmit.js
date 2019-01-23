const { produce } = require('immer');
const { reduce } = require('fxjs2');

// deepOmit
module.exports = (pattern, obj) => produce(obj, (draft) => {
    const lastKey = pattern.pop();
    const target = reduce((o, k) => (o ? o[k] : undefined), draft, pattern);
    if (target) delete target[lastKey];
});
