const { go, map, identity } = require('fxjs2');

const ifElse = require('./ifElse');
const pAll = require('../etc/pAll');
const hasPromise = require('../etc/hasPromise');

/*
* 같은 인자로 여러 함수 순차 실행 및 결과값들 Array 리턴
* Async 함수도 지원 및 여러 인자도 지원
*/
// multiFn
module.exports = (...fns) => (...params) => go(
    fns,
    map(fn => fn(...params)),
    ifElse(hasPromise, pAll, identity),
);
