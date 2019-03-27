const {
    reduce, map
} = require('fxjs2');
const set = require('../object/set');
const roundTo = require('../number/roundTo');

// addRatio
module.exports = (f, iter, decimal = 2, total) => {
    const all = total || reduce((acc, cur) => acc + f(cur), 0, iter);
    return map(x => set('ratio', roundTo(f(x) / all, decimal))(x), iter);
};
