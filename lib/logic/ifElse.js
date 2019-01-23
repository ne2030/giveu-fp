const isFunction = require('../etc/isFunction');
const isPromise = require('../etc/isPromise');

/*
* predicate 가 참인 결과를 리턴하면 func 실행, 아니면 alternative 함수 실행
* predi, func, alter 셋다 함수가 기본형이지만 그냥 값으로 전달해도 가능
*/

// ifElse
module.exports = (predi, func, alter) => (...params) => {
    const fn = flag => (flag ? (isFunction(func) ? func(...params) : func) : isFunction(alter) ? alter(...params) : alter);

    const flag = isFunction(predi) ? predi(...params) : predi;
    return isPromise(flag) ? flag.then(fn) : fn(flag);
};
