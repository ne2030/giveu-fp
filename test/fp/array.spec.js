const { identity } = require('fxjs2');

const test = require('../testFns');

const {
    randomEl, push, unique, arrIncludes, notIn, range, intersection, pararell, intersectionBy,
    partition, findIndex, shuffle, cross, addRatio, splitEvery, groupWith, orderBy,
} = require('../../lib/array');

const { val } = require('../../lib/object');

const nArray = [1, 2, 3, 4, 5];
const arr1to10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

describe(
    test.fileNaming('Common', 'Fp_util - Array functions'),
    () => {
        it('randomEl', () => {
            const ran = randomEl(nArray);
            const idx = nArray.indexOf(ran);
            test.notEqual(-1, idx);
        });

        describe('push', () => {
            const arr = [1, 2, 3];
            it('basic push', () => {
                const result = push(arr, 4);
                test.deepEqual(result, [1, 2, 3, 4]);
            });

            it('curried push', () => {
                const result = push(arr)(4);
                test.deepEqual(result, [1, 2, 3, 4]);
            });
        });

        describe('unique', () => {
            it('unique with compare fn', () => {
                const objectArr = [
                    { a: 10, b: 20 },
                    { a: 20, b: 30 },
                    { a: 30, b: 20 }
                ];

                const compareB = o => o.b;
                const result = unique(compareB, objectArr);
                test.deepEqual(result, [{ a: 10, b: 20 }, { a: 20, b: 30 }]);
            });
        });

        describe('arrIncludes', () => {
            it('should return true with included element', () => {
                test.ok(arrIncludes(nArray, 1));
            });

            it('should return false with not included element', () => {
                test.isFalsy(arrIncludes(nArray, 6));
            });

            it('should work with curry', () => {
                test.equal(arrIncludes(nArray)(1), true);
                test.equal(arrIncludes(nArray)(6), false);
            });
        });

        describe('notIn', () => {
            const coll = [1, 2, 3];
            const coll2 = ['a', 'b', 'c'];
            it('should return true when data is not an element of coll', () => {
                test.ok(notIn(4, coll));
                test.ok(notIn('d', coll2));
            });

            it('should return false when data is included', () => {
                test.notOk(notIn(1, coll));
                test.notOk(notIn('a', coll2));
            });
        });

        describe('range', () => {
            it('should has exact count', () => {
                const numbers = [...range(10)];
                test.hasLength(10, numbers);
            });

            it('should start with start', () => {
                const numbers = [...range(10, 3)];
                test.hasLength(10, numbers);
                test.equal(3, numbers[0]);
            });
        });

        describe('intersection', () => {
            const arr6to15 = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            it('should return intersection of two array', () => {
                test.deepEqual(intersection(arr1to10, arr6to15), [6, 7, 8, 9, 10]);
            });

            it('should return empty arr', () => {
                test.deepEqual(intersection([], []), []);
                test.deepEqual(intersection(arr1to10, []), []);
            });
        });

        describe('intersectionBy', () => {
            const arr6to15 = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            it('should return intersection of two array', () => {
                test.deepEqual(intersectionBy(identity, arr1to10, arr6to15), [6, 7, 8, 9, 10]);
            });

            it('should return empty arr', () => {
                test.deepEqual(intersectionBy(identity, [], []), []);
                test.deepEqual(intersectionBy(identity, arr1to10, []), []);
            });
        });

        describe('partition', () => {
            const isEven = n => n % 2 === 0;
            it('should return partitioned array', () => {
                test.deepEqual(partition(isEven, arr1to10), [[2, 4, 6, 8, 10], [1, 3, 5, 7, 9]]);
            });
        });

        describe('findIndex', () => {
            const isEven = n => n % 2 === 0;
            it('should find index of predicated', () => {
                test.equal(findIndex(isEven, nArray), 1);
                test.equal(findIndex(n => n === 5, nArray), 4);
            });

            it('should find index of predicated', () => {
                test.equal(findIndex(isEven, nArray), 1);
                test.equal(findIndex(n => n === 5, nArray), 4);
            });
        });

        describe('shuffle', () => {
            it('should return shuffled array', () => {
                test.notDeepEqual(arr1to10, shuffle(arr1to10));
            });
        });

        describe('cross', () => {
            it('should execute function with matched element', () => {
                const people = [
                    { name: 'ryan', id: 1 },
                    { name: 'alice', id: 2 },
                    { name: 'henry', id: 3 }
                ];

                const job = [
                    { id: 2, job: 'designer' },
                    { id: 1, job: 'dev' },
                    { id: 3, job: 'front-end' }
                ];

                const result = cross(people, job, (a, b) => a.id == b.id, (a, b) => Object.assign(a, b));

                test.deepEqual(result, [
                    { name: 'ryan', id: 1, job: 'dev' },
                    { name: 'alice', id: 2, job: 'designer' },
                    { name: 'henry', id: 3, job: 'front-end' }
                ]);
            });

            it('should return original if not matched', () => {
                const people = [
                    { name: 'ryan', id: 1 },
                    { name: 'alice', id: 2 },
                    { name: 'henry', id: 3 }
                ];

                const job = [
                    { id: 3, job: 'dev' },
                    { id: 2, job: 'designer' },
                    { id: 4, job: 'front-end' }
                ];

                const result = cross(people, job, (a, b) => a.id == b.id, (a, b) => Object.assign(a, b));

                test.deepEqual(result, [
                    { name: 'ryan', id: 1 },
                    { name: 'alice', id: 2, job: 'designer' },
                    { name: 'henry', id: 3, job: 'dev' }
                ]);
            });

            it('should adapt nf function if not matched', () => {
                const people = [
                    { name: 'ryan', id: 1 },
                    { name: 'alice', id: 2 },
                    { name: 'henry', id: 3 },
                    { name: 'jacob', id: 4 }
                ];

                const job = [
                    { id: 3, job: 'dev' },
                    { id: 2, job: 'designer' },
                    { id: 5, job: 'front-end' }
                ];

                const result = cross(
                    people, job,
                    (a, b) => a.id == b.id,
                    (a, b) => Object.assign(a, b),
                    a => (a.job = 'none', a)
                );

                test.deepEqual(result, [
                    { name: 'ryan', id: 1, job: 'none' },
                    { name: 'alice', id: 2, job: 'designer' },
                    { name: 'henry', id: 3, job: 'dev' },
                    { name: 'jacob', id: 4, job: 'none' }
                ]);
            });
        });

        describe('addRatio', () => {
            it('should calculate and add ratio', () => {
                const data = [
                    { amount: 100 },
                    { amount: 200 },
                    { amount: 300 },
                    { amount: 400 },
                ];

                test.deepEqual(addRatio(x => x.amount, data), [
                    { amount: 100, ratio: 0.1 },
                    { amount: 200, ratio: 0.2 },
                    { amount: 300, ratio: 0.3 },
                    { amount: 400, ratio: 0.4 },
                ]);
            });
        });

        describe('splitEvery', () => {
            it('should split iterble into length n array', () => {
                const xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

                test.deepEqual(splitEvery(2, xs), [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]);
                test.deepEqual(splitEvery(3, xs), [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
            });
        });

        describe('groupWith', () => {
            it('should group with predicate as array', () => {
                const xs = [
                    { a: 1 },
                    { a: 2 },
                    { a: 1 },
                    { a: 3 },
                ];

                const result = groupWith(obj => obj.a, xs);
                test.deepEqual(result, [[{ a: 1 }, { a: 1 }], [{ a: 2 }], [{ a: 3 }]]);
            });
        });

        describe('pararell', () => {
            it('should predicate same index elements - origin value', () => {
                const xs = [1, 2, 3, 4, 5];
                const ys = [6, 7, 8, 9, 10];
                const add = (a, b) => a + b;

                test.deepEqual(pararell(xs, ys, add), [7, 9, 11, 13, 15]);
            });

            it('should predicate same index elements - reference value', () => {
                const xs = [{ a: 1 }, { a: 2 }, { a: 3 }];
                const ys = [1, 3, 5];
                const set = (a, b) => ({ ...a, b });

                test.deepEqual(pararell(xs, ys, set), [{ a: 1, b: 1 }, { a: 2, b: 3 }, { a: 3, b: 5 }]);
            });
        });

        describe('orderBy', () => {
            it('should order by one depth criteria - number', () => {
                const arr = [1, 4, 2, 3, 5];

                test.deepEqual(orderBy(identity)(arr), [1, 2, 3, 4, 5]);
            });

            it('should order by one depth criteria', () => {
                const arr = [
                    { name: 'z', order: 100 },
                    { name: 'e', order: 5 },
                    { name: 'a', order: 1 },
                    { name: 'c', order: 3 },
                ];

                const expected = [
                    { name: 'a', order: 1 },
                    { name: 'c', order: 3 },
                    { name: 'e', order: 5 },
                    { name: 'z', order: 100 },
                ];

                test.deepEqual(orderBy(a => a.order)(arr), expected);
            });

            it('should order by several criteria - 2', () => {
                const arr = [
                    { id: 1, n: 100, age: 50 },
                    { id: 2, n: 200, age: 10 },
                    { id: 3, n: 150, age: 50 },
                    { id: 4, n: 100, age: 30 },
                    { id: 5, n: 200, age: 50 },
                    { id: 6, n: 200, age: 90 },
                    { id: 7, n: 300, age: 51 },
                    { id: 8, n: 300, age: 50 },
                ];

                const expected = [
                    { id: 2, n: 200, age: 10 },
                    { id: 4, n: 100, age: 30 },
                    { id: 1, n: 100, age: 50 },
                    { id: 3, n: 150, age: 50 },
                    { id: 5, n: 200, age: 50 },
                    { id: 8, n: 300, age: 50 },
                    { id: 7, n: 300, age: 51 },
                    { id: 6, n: 200, age: 90 },
                ];

                test.deepEqual(
                    orderBy(val('age'), val('n'))(arr),
                    expected
                );
            });

            // it('should predicate same index elements - reference value', () => {
            //     const xs = [{ a: 1 }, { a: 2 }, { a: 3 }];
            //     const ys = [1, 3, 5];
            //     const set = (a, b) => ({ ...a, b });

            //     test.deepEqual(pararell(xs, ys, set), [{ a: 1, b: 1 }, { a: 2, b: 3 }, { a: 3, b: 5 }]);
            // });
        });
    }
);
