// iff
module.exports = (predi, f) => arg => (predi(arg) ? f(arg) : arg);
