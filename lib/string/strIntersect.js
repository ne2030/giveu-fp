const {
    filter, map, noop, go
} = require('fxjs2');
const typeCheckAll = require('../etc/typeCheckAll');
const strSplit = require('../string/strSplit');
const isEmpty = require('../etc/isEmpty');
const intersection = require('../array/intersection');

// strIntersect
module.exports = (str1, str2, spliter = ',') => {
    const splited = go(
        [str1, str2],
        filter(typeCheckAll(['string', 'number'])),
        map(strSplit(spliter)),
    );

    if (isEmpty(splited)) return noop();

    return go(
        splited,
        strArrs => intersection(...strArrs),
        arr => arr.join(spliter)
    );
};
