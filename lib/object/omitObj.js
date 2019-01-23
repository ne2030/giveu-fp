const {
    curry, omit, match, constant, entries, map, head, filter, go
} = require('fxjs2');
const isArray = require('../etc/isArray');
const isFunction = require('../etc/isFunction');

// omitObj
module.exports = curry((predi, obj) => {
    const omitFromObj = keys => omit(keys, obj);
    return match(predi)
        .case(isArray)(omitFromObj)
        .case(isFunction)(_ => go(obj, entries, filter(([, v]) => predi(v)), map(head), omitFromObj))
        .else(constant(Error('인풋값이 array 나 function 이 아닙니다')));
});
