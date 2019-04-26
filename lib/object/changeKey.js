const { go, omit } = require('fxjs2');
const set = require('./set');

// changeKey
module.exports = function f(obj, prevKey, newKey) {
    // 인자 2개면 prevKey 와 newKey 로 partial application
    return arguments.length === 2
        ? o => f(o, obj, prevKey)
        : (() => {
            if (!(prevKey in obj)) return obj;
            const tmp = obj[prevKey];
            return go(obj, omit(prevKey), set(newKey, tmp));
        })();
};
