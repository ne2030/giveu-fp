const hasPromise = require('./hasPromise');
const pAll = require('./pAll');

// callN
module.exports = (fn, n, ...args) => {
    const results = [];
    for (let i = 0; i < n; i += 1) {
        results.push(fn(...args));
    }
    return hasPromise(results) ? pAll(results) : results;
};
