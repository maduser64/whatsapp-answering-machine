const deltaText = require('./utils').deltaText;
const timestamp = require('./utils').timestamp;

let startTime = timestamp();

function refreshStartTime() {
    startTime = timestamp();
}

function log() {
    console.log.apply(null, arguments);
}

function logT() {
    process.stdout.write('S' + deltaText(startTime) + ' ');
    log.apply(null, arguments);
}

module.exports = {
    log,
    logT,
    refreshStartTime,
};