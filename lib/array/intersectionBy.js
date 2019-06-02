const { filter, map } = require('fxjs2');

// intersection
module.exports = (f, collA, collB) => {
    const setB = new Set(map(f, collB));
    return filter(a => setB.has(f(a)), collA);
};
