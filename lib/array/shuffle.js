const random = require('../number/random');

// shuffle
module.exports = (coll) => {
    const { length } = coll;
    const shuffled = Array(length);
    for (let index = 0, rand; index < length; index++) {
        rand = random(0, index);
        if (rand !== index) shuffled[index] = shuffled[rand];
        shuffled[rand] = coll[index];
    }
    return shuffled;
};
