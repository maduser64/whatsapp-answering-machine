const fs = require('fs');
const crypto = require('crypto');

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, function read(err, data) {
            if (err) {
                reject(err);
            }

            resolve(data.toString());
        });
    });
};

const timestamp = () => {
    return (new Date()).getTime();
};

const leadingZero = (number = 0, minSize) => {
    let output = String(number);

    while (output.length < minSize) {
        output = '0' + output;
    }

    return output;
};

const inSeconds = (millis) => {
      return Math.round(millis / 1000);
};

const deltaText = (previousTimestamp) => {
    const now = timestamp(),
        delta = now - previousTimestamp,
        seconds = inSeconds(delta);

    return leadingZero(seconds, 5);
};

const checksum = (str, algorithm, encoding) => {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex')
};

const wait = (delay) => {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            resolve(true);
        }, delay)
    })
};

module.exports = {
    readFile,
    timestamp,
    deltaText,
    checksum,
    wait,
};
