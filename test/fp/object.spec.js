const test = require('../testFns');

const {
    dic, val, pick, pickable, get, set, omitObj, changeKey, deepPick, deepOmit
} = require('../../lib/object');

const object = { a: 10, b: 20, c: [1, 2] };

const deepObj = {
    a: {
        b: {
            c: {
                d: 100
            }
        }
    },
    e: 20,
    f: 30
};

describe(
    test.fileNaming('Common', 'Fp_util - Object functions'),
    () => {
        describe('get value from object', () => {
            describe('dic', () => {
                it('should get exact value from object using key', () => {
                    test.equal(dic(deepObj, 'e'), 20);
                    test.equal(dic(deepObj)('e'), 20);
                });
            });
            describe('val', () => {
                it('should get exact value from object using key', () => {
                    test.equal(val('e', deepObj), 20);
                    test.equal(val('e')(deepObj), 20);
                });
            });

            describe('pick', () => {
                it('should select keys with new Object', () => {
                    test.deepEqual(pick(['a', 'b'], object), { a: 10, b: 20 });
                });

                it('should select keys with new Object - curry', () => {
                    test.deepEqual(pick(['a', 'b'])(object), { a: 10, b: 20 });
                });

                it('should not pick void value from object', () => {
                    test.deepEqual(pick(['a', 'b', 'e'], object), { a: 10, b: 20 });
                    test.deepEqual(pick('e', object), {});
                });
            });

            describe('pickable', () => {
                it('should get values as object from object using key', () => {
                    test.deepEqual(pickable(deepObj, 'e'), { e: 20 });
                    test.deepEqual(pickable(deepObj)('e'), { e: 20 });
                    test.deepEqual(pickable(deepObj)(['e', 'f']), { e: 20, f: 30 });
                });

                it('should not include undefined or non-existing value from obj', () => {
                    test.deepEqual(pickable(deepObj, 'aaa'), {});
                });
            });

            describe('get', () => {
                it('should get deep values from object', () => {
                    test.deepEqual(get(deepObj, 'a.b.c.d'), 100);
                });

                it('should return undefined when pattern has error', () => {
                    test.equal(get(deepObj, 'a.bb.c.d'), undefined);
                });
            });
        });

        describe('set', () => {
            it('assign value just one depth', () => {
                const assign1 = set('a', 'b');
                test.deepEqual(assign1({}), { a: 'b' });
            });

            it('assign value 2 or more depth', () => {
                const assignN = set(['a', 'b', 'c', 'd'], 'e');
                test.deepEqual(assignN({ a: { b: { c: {} } } }), { a: { b: { c: { d: 'e' } } } });
            });

            it('should throw error when middle key is isFalsy object', () => {
                const obj = { a: { b: 1 } };
                const assignA = set(['a', 'b', 'd'], 2);
                test.deepEqual(assignA(obj), obj);
            });
        });

        describe('changeKey', () => {
            it('chnage Object Key', () => {
                const result = changeKey(deepObj, 'e', 'b');
                test.equal(result.b, 20);
            });

            it('curried chnage Key', () => {
                const result = changeKey('e', 'b')(deepObj);
                test.equal(result.b, 20);
            });
        });

        describe('omitObj', () => {
            const obj = {
                a: 10,
                b: [],
                c: {
                    d: 10
                }
            };

            it('should omit given key', () => {
                test.deepEqual(omitObj(['a', 'b'], obj), { c: { d: 10 } });
            });

            it('should omit with given predicate', () => {
                const isNumber = n => typeof n === 'number';
                test.deepEqual(omitObj(isNumber, obj), { b: [], c: { d: 10 } });
            });
        });

        describe('deepOmit', () => {
            it('should omit deep Object', () => {
                const deepPattern = ['a', 'b', 'c', 'd'];
                const result = deepOmit(deepPattern, deepObj);
                test.deepEqual(result, { a: { b: { c: {} } }, e: 20, f: 30 });
            });

            it('curried deep omit Object', () => {
                const deepPattern = ['a', 'b', 'c', 'd'];
                const result = deepOmit(deepPattern)(deepObj);
                test.deepEqual(result, { a: { b: { c: {} } }, e: 20, f: 30 });
            });
        });

        describe('pick', () => {
            it('should return selected object - one property', () => {
                test.deepEqual(pick('e', deepObj), { e: 20 });
            });

            it('should return selected object - several property', () => {
                test.deepEqual(pick(['e', 'f'], deepObj), { e: 20, f: 30 });
            });

            it('should return selected object - not property', () => {
                test.deepEqual(pick('i', deepObj), {});
                test.deepEqual(pick(['i', 'h'], deepObj), {});
            });

            it('should return selected object - curry', () => {
                test.deepEqual(pick('e')(deepObj), { e: 20 });
                test.deepEqual(pick(['e', 'f'])(deepObj), { e: 20, f: 30 });
            });
        });

        describe('deepPick', () => {
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

            it('should pick deep object', () => {
                const deepPattern = ['a', { n: 'c', p: ['aa', { n: 'cc', p: ['aaa'] }] }];
                const result = deepPick(deepPattern, deep);
                test.deepEqual(result, { a: 1, c: { aa: 10, cc: { aaa: 100 } } });
            });

            it('curried pick deep object', () => {
                const deepPattern = ['a', { n: 'c', p: ['aa', { n: 'cc', p: ['aaa'] }] }];
                const result = deepPick(deepPattern)(deep);
                test.deepEqual(result, { a: 1, c: { aa: 10, cc: { aaa: 100 } } });
            });
        });
    }
);
