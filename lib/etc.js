const call = require('./etc/call');
const callN = require('./etc/callN');
const compareDate = require('./etc/compareDate');
const curryr = require('./etc/curryr');
const delay = require('./etc/delay');
const getType = require('./etc/getType');
const gt = require('./etc/gt');
const gte = require('./etc/gte');
const hasPromise = require('./etc/hasPromise');
const isArray = require('./etc/isArray');
const isBool = require('./etc/isBool');
const isEmpty = require('./etc/isEmpty');
const isEqual = require('./etc/isEqual');
const isError = require('./etc/isError');
const isFunction = require('./etc/isFunction');
const isNil = require('./etc/isNil');
const isNotEqual = require('./etc/isNotEqual');
const isNumber = require('./etc/isNumber');
const isObject = require('./etc/isObject');
const isPromise = require('./etc/isPromise');
const isStrictEqual = require('./etc/isStrictEqual');
const isString = require('./etc/isString');
const log = require('./etc/log');
const lt = require('./etc/lt');
const lte = require('./etc/lte');
const pAll = require('./etc/pAll');
const parseJson = require('./etc/parseJson');
const tryCatch = require('./etc/tryCatch');
const typeCheck = require('./etc/typeCheck');
const typeCheckAll = require('./etc/typeCheckAll');
const typeElse = require('./etc/typeElse');
const toBool = require('./etc/toBool');
const iff = require('./etc/iff');

module.exports = {
    call, callN, compareDate, curryr, delay, getType, gt, gte, hasPromise, isArray, isBool,
    isEmpty, isEqual, isError, isFunction, isNil, isNotEqual, isNumber, isObject, isPromise,
    isStrictEqual, isString, log, lt, lte, pAll, parseJson, tryCatch, typeCheck, typeCheckAll, typeElse,
    toBool, iff
};
