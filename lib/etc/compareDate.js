const moment = require('moment');

// compareDate
module.exports = (a, b) => {
    const momentA = moment.isMoment(a) ? a : moment(a);
    const momentB = moment.isMoment(b) ? b : moment(b);

    if (!momentA.isValid() || !momentB.isValid()) return new Error('invalid moment date');

    return momentA.diff(momentB) > 0;
};
