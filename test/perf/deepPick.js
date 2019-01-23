const { reduce } = require('fxjs2');
const { tester } = require('../performanceTester');

const deep = {
    a: 1,
    b: 2,
    c: {
        aa: 10,
        bb: 20,
        cc: {
            aaa: 100,
            bbb: 200
        }
    }
};

// old one
const deepPick = require('../../lib/object/deepPick');

// new one
const getOnlyKey = obj => Object.keys(obj)[0];
function f(pattern, obj) {
    return reduce((o, k) => {
        if (typeof k === 'object') {
            const name = getOnlyKey(k);
            return (o[name] = f(k[name], obj[name]), o);
        }
        return (o[k] = obj[k], o);
    }, {}, pattern);
}

const old = () => deepPick(['a', { n: 'c', p: ['aa', { n: 'cc', p: ['aaa'] }] }], deep);
tester('old', old, 30000);

const newOne = () => f(['a', { c: ['aa', { cc: ['aaa'] }] }], deep);
tester('new', newOne, 30000);
