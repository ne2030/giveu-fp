const {
    reduce, map, curry, go
} = require('fxjs2');
const set = require('../object/set');
const roundTo = require('../number/roundTo');
const add = require('../number/add');

// addRatio
module.exports = curry((f, iter) => {
    const all = go(iter, map(f), reduce(add));
    return map(x => set('ratio', roundTo(f(x) / all, 4))(x), iter);
});
