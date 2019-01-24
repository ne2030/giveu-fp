const { curry, reduce } = require('fxjs2');

const getOnlyKey = obj => Object.keys(obj)[0];

// deepPick
module.exports = curry(function deepPick(pattern, obj) {
    return reduce((o, k) => {
        if (typeof k === 'object') {
            const name = getOnlyKey(k);
            if (!(name in obj)) return o;
            return (o[name] = deepPick(k[name], obj[name]), o);
        }
        return (o[k] = obj[k], o);
    }, {}, pattern);
});
