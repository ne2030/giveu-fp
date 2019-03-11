const { produce } = require('immer');

module.exports = (k, f) => obj => produce(obj, (draft) => {
    draft[k] = f(draft[k]);
});
