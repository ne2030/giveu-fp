const { produce } = require('immer');
const { curry, keys, map } = require('fxjs2');

// evolve
module.exports = curry((transform, obj) => produce(obj, (draft) => {
    const properties = keys(transform);
    map(key => draft[key] = transform[key](draft[key]), properties);
}));
