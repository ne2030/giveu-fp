const { map } = require('fxjs2');


const test = require('../testFns');

const {
    dic, val, pick, pickable, get, set, omit, changeKey, deepPick, deepOmit, evolve, renew, deepAssign, has
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

            it('should work with map', () => {
                const data = [{}, {}, {}, {}];

                const b = 2;
                test.deepEqual(map(set('b', b))(data), [{ b: 2 }, { b: 2 }, { b: 2 }, { b: 2 }]);
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

            it('not throw error when not have key', () => {
                const testObj = { a: 1 };
                const result = changeKey('b', 'c')(testObj);
                test.deepEqual(result, { a: 1 });
            });
        });

        describe('evolve', () => {
            it('change values with transform fn', () => {
                const toUp = str => str.toUpperCase();
                const toLow = str => str.toLowerCase();
                const mul100 = n => n * 100;

                const obj = {
                    a: 'abcde',
                    b: 'AbCdE',
                    c: 12,
                };

                const trans = {
                    a: toUp,
                    b: toLow,
                    c: mul100,
                };

                const result = evolve(trans, obj);

                test.deepEqual(result, { a: 'ABCDE', b: 'abcde', c: 1200 });
            });
        });

        describe('rewew', () => {
            it('change value of key with fn', () => {
                const toUp = str => str.toUpperCase();
                const obj = {
                    a: 'abcde',
                    b: 'fghij',
                };

                const result = renew('a', toUp)(obj);

                test.deepEqual(result, { a: 'ABCDE', b: 'fghij' });
            });
        });

        describe('omit', () => {
            const obj = {
                a: 10,
                b: [],
                c: {
                    d: 10
                }
            };

            it('should omit given key', () => {
                test.deepEqual(omit(['a', 'b'], obj), { c: { d: 10 } });
            });

            it('should omit with given predicate', () => {
                const isNumber = n => typeof n === 'number';
                test.deepEqual(omit(isNumber, obj), { b: [], c: { d: 10 } });
            });
        });

        describe('deepOmit', () => {
            const deep = {
                a: {
                    b: {
                        c: {
                            d: 100
                        }
                    }
                },
                e: {
                    f: 20,
                    g: 30
                },
                h: {
                    i: 30,
                    j: 1,
                }
            };

            it('should omit deep object', () => {
                const deepPattern = 'a.b.c.d';
                const result = deepOmit(deepPattern)(deep);
                test.deepEqual(result, { a: { b: { c: {} } }, e: { f: 20, g: 30 }, h: { i: 30, j: 1 } });
            });

            it('curried deep omit Object', () => {
                const deepPattern = 'a.b.c.d';
                const result = deepOmit(deepPattern)(deep);
                test.deepEqual(result, { a: { b: { c: {} } }, e: { f: 20, g: 30 }, h: { i: 30, j: 1 } });
            });

            it('should omit multiple keys', () => {
                const deepKeys = ['a.b.c.d', 'e.f', 'h.j'];
                const result = deepOmit(deepKeys)(deep);
                test.deepEqual(result, { a: { b: { c: {} } }, e: { g: 30 }, h: { i: 30 } });
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
                const deepPattern = ['a', { c: ['aa', { cc: ['aaa'] }] }];
                const result = deepPick(deepPattern, deep);
                test.deepEqual(result, { a: 1, c: { aa: 10, cc: { aaa: 100 } } });
            });

            it('curried pick deep object', () => {
                const deepPattern = ['a', { c: ['aa', { cc: ['aaa'] }] }];
                const result = deepPick(deepPattern)(deep);
                test.deepEqual(result, { a: 1, c: { aa: 10, cc: { aaa: 100 } } });
            });
        });

        describe('deepAssign', () => {
            it('should assign to deep object', () => {
                const deep = {
                    a: {
                        b: 1,
                    }
                };

                const result = deepAssign('a', { c: 2, d: 3 })(deep);
                test.deepEqual(result, { a: { b: 1, c: 2, d: 3 } });
            });

            it('should assign to deep object', () => {
                const deep = {
                    a: {
                        b: 1,
                    }
                };

                const result = deepAssign('a', { c: 2, d: 3 })(deep);
                test.notEqual(result, deep);
                test.deepEqual(result, { a: { b: 1, c: 2, d: 3 } });
            });
        });

        describe('has', () => {
            it('should return true when has key', () => {
                const obj = { a: 1 };

                test.equal(has('a', obj), true);
            });

            it('should return false when not has key', () => {
                const obj = { a: 1 };

                test.equal(has('b', obj), false);
            });

            it('should work with currying', () => {
                const obj = { a: 1 };

                test.equal(has('a')(obj), true);
                test.equal(has('b')(obj), false);
            });
        });
    }
);
