const moment = require('moment');
const { identity, constant } = require('fxjs2');

const test = require('../testFns');

const {
    log, isEmpty, callN, tryCatch, typeCheck, typeCheckAll, getType, typeCompare,
    compareDate, parseJson, isNil, pAll,
    curryr, toBool,
} = require('../../lib/etc');

const {
    alwaysFalse: aF, aFin
} = require('../testValues');

describe(
    test.fileNaming('Common', 'Fp_util - etc'),
    () => {
        describe('curryr', () => {
            const divide = (target, base) => target / base;
            it('should return curried function', () => {
                const curriedDivide = curryr(divide);
                test.isFunction(curriedDivide);
            });

            it('should curry from right', () => {
                const curriedDivide = curryr(divide);
                const divide5 = curriedDivide(5);
                test.isFunction(divide5);
                test.equal(3, divide5(15));
            });
        });

        describe('log', () => {
            it('should return argument itself', () => {
                const msg = 'success';
                test.equal(log('Log test :: ', msg), msg);
            });

            it('should curried with prefix', () => {
                const msg = 'success';
                test.equal(log('Log test :: ')('success'), msg);
            });
        });

        describe('isEmpty', () => {
            it('should return true with empty', () => {
                const testIter = (function* () { yield* []; }());
                test.ok(isEmpty([]));
                test.ok(isEmpty(''));
                test.ok(isEmpty({}));
                test.ok(isEmpty(testIter));
            });

            it('should return false with non-empty', () => {
                const testIter = (function* () { yield* [1]; }());
                test.notOk(isEmpty([1]));
                test.notOk(isEmpty('1'));
                test.notOk(isEmpty({ a: 1 }));
                test.notOk(isEmpty(testIter));
            });
        });

        describe('callN', () => {
            it('sync fn call', () => {
                const f = identity;
                const f1 = constant(10);
                test.deepEqual(callN(f, 3, 1), [1, 1, 1]);
                test.deepEqual(callN(f1, 4), [10, 10, 10, 10]);
            });

            it('async fn call', async () => {
                const f = async i => i;
                const f1 = async () => 10;
                const r = await callN(f, 3, 1);
                const r1 = await callN(f1, 4);
                test.deepEqual(r, [1, 1, 1]);
                test.deepEqual(r1, [10, 10, 10, 10]);
            });
        });

        describe('tryCatch', () => {
            const errorThrower = () => undefined.hello;
            it('should catch when error occured and return error object', () => {
                const result = tryCatch(errorThrower)();
                test.isError(result);
            });

            it('should handled by custom handler', () => {
                const result = tryCatch(errorThrower, aFin)();
                test.equal(result, 'Fin');
            });
        });

        describe('typeCheck', () => {
            it('should check type right', () => {
                test.ok(typeCheck('string', 'text'));
                test.ok(typeCheck('object', {}));
                test.ok(typeCheck('array', []));
                test.ok(typeCheck('function', aF));
                test.ok(typeCheck('undefined', undefined));
                test.ok(typeCheck('null', null));
                test.ok(typeCheck('number', 1));
                test.ok(typeCheck('error', Error()));
                test.ok(typeCheck('NaN', NaN));
            });

            it('should return false when type wrong', () => {
                test.notOk(typeCheck('string', false));
                test.notOk(typeCheck('object', []));
                test.notOk(typeCheck('array', {}));
                test.notOk(typeCheck('function', '1'));
                test.notOk(typeCheck('undefined', null));
                test.notOk(typeCheck('null', undefined));
                test.notOk(typeCheck('number', '1'));
                test.notOk(typeCheck('error', []));
                test.notOk(typeCheck('NaN', 1));
            });
        });

        describe('typeCheckAll', () => {
            const types = ['string', 'object'];

            const testString = 'test string';
            const testObject = { a: 10 };
            const testArray = [1];
            const testNumber = 10;
            it('should return true if type is one of given types', () => {
                test.ok(typeCheckAll(types, testString));
                test.ok(typeCheckAll(types, testObject));
            });

            it('should return false if type is isFalsy one of given types', () => {
                test.notOk(typeCheckAll(types, testArray));
                test.notOk(typeCheckAll(types, testNumber));
            });
        });

        describe('getType', () => {
            it('get type of objects', () => {
                test.equal(getType('string'), 'string');
                test.equal(getType([]), 'array');
                test.equal(getType({}), 'object');
                test.equal(getType(10), 'number');
                test.equal(getType(undefined), 'undefined');
                test.equal(getType(null), 'null');
                test.equal(getType(() => { }), 'function');
                test.equal(getType(true), 'boolean');
            });
        });

        describe('typeCompare', () => {
            it('compare type with data', () => {
                test.ok(typeCompare({}, { a: 1 }));
                test.ok(typeCompare([], [1, 2, 3]));
                test.ok(typeCompare(1, 2));
                test.ok(typeCompare('1', '2'));
                test.ok(typeCompare(undefined, undefined));
                test.notOk(typeCompare(1, null));
                test.notOk(typeCompare('1', 1));
                test.notOk(typeCompare({}, []));
                test.notOk(typeCompare(null, undefined));
            });
        });

        describe('compareDate', () => {
            it('compare basic js date', () => {
                const today = new Date();
                const anHourAgo = new Date() - 1000 * 60 * 60;
                test.ok(compareDate(today, anHourAgo));
            });

            it('compare js date with moment date', () => {
                const today = new Date();
                const yesterday = moment().subtract(1, 'day');
                test.ok(compareDate(today, yesterday));
            });

            it('compare moment date', () => {
                const today = moment();
                const yesterday = moment().subtract(1, 'day');
                test.ok(compareDate(today, yesterday));
            });

            it('compare invalid date', () => {
                const today = new Date();
                const invalidDate = NaN;
                test.isError(compareDate(today, invalidDate));
            });
        });

        describe('parseJson', () => {
            const jsonString = JSON.stringify({ a: 1, b: 2 });
            const wrongString = 'efa';
            it('should return parsed json', () => {
                test.deepEqual(parseJson(jsonString), { a: 1, b: 2 });
            });

            it('should return null with contaminated json string', () => {
                test.equal(parseJson(wrongString), null);
            });
        });

        describe('Nil or Empty', () => {
            it('isNil :: true when null or undefined', () => {
                test.ok(isNil(null));
                test.ok(isNil(undefined));
                test.isFalsy(isNil([]));
            });

            it('isNil :: false when Number, str', () => {
                test.isFalsy(isNil(4444));
                test.isFalsy(isNil([]));
                test.isFalsy(isNil(''));
                test.isFalsy(isNil('234'));
            });
        });

        describe('pAll', () => {
            it('pAll :: should return Promise', () => {
                const promises = [Promise.resolve('a'), Promise.resolve('b')];
                const result = pAll(promises);
                test.ok(result instanceof Promise);
                result.then((rtn) => {
                    test.equal(rtn[0], 'a');
                    test.equal(rtn[1], 'b');
                });
            });
        });

        describe('toBool', () => {
            it('should return boolean', () => {
                test.ok(toBool({}));
                test.ok(toBool([]));
                test.ok(toBool(true));
                test.notOk(toBool(''), false);
                test.notOk(toBool(false), false);
            });
        });
    }
);
