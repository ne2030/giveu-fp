const { pipe, identity, constant } = require('fxjs2');

const ifElse = require('../logic/ifElse');
const tryCatch = require('./tryCatch');
const isError = require('./isError');


/**
 * json 파싱
 * JSON 형식이 아니면 null 반환
 */
// parseJson
module.exports = pipe(
    tryCatch(JSON.parse),
    ifElse(isError, constant(null), identity)
);
