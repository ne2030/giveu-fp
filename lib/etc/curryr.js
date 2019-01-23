// curryr
module.exports = f => (...args) => (args.length === 2 ? f(...args) : a => f(a, args[0]));
