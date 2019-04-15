const {
    reduce, map, curry
} = require('fxjs2');
const set = require('../object/set');
const roundTo = require('../number/roundTo');

// addRatio
module.exports = curry((f, iter) => {
    const all = reduce((acc, cur) => acc + f(cur), 0, iter);
    return map(x => set('ratio', roundTo(f(x) / all, 4))(x), iter);
});
