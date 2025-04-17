const rateLimit = require('express-rate-limit');

exports.userRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 10,
    keyGenerator: (req) => {
        return req.ip;
    },
    handler: (req, res) => {
        return LOG.info('Too many requests', null, res, false, 200);
    }
});


