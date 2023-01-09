const Sentry = require("@sentry/node");

function initializeSentry(dsn) {
    Sentry.init({
        dsn,
        tracesSampleRate: 1.0,
    });
}

module.exports = initializeSentry