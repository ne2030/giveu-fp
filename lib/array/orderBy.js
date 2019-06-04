const {
    go, head, map, tail, deepFlat,
} = require('fxjs2');

const isArray = require('../etc/isArray');
const baseOrderBy = require('./baseOrderBy');

// orderBy
module.exports = function orderBy(...fs) {
    return arr => go(
        arr,
        baseOrderBy(head(fs)),
        map(x => ((isArray(x) && fs.length > 1) ? orderBy(...tail(fs))(x) : x)),
        deepFlat,
    );
};
