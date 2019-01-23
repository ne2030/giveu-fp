const { match } = require('fxjs2');
const curryr = require('../etc/curryr');
const nToStr = require('../number/nToStr');

// strSplit
module.exports = curryr((str, spliter) => match(typeof str)
    .case('string')(() => str.split(spliter))
    .case('number')(() => nToStr(str).split(spliter))
    .else(() => []));
