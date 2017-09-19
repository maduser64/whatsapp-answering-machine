const Runner = require('./utils/Runner');
const log = require('./utils/log').logT;
const {login} = require('./utils/login_api');

const contractId = 'd06a32f9';

(async () => {
    const runner = new Runner('https://web.whatsapp.com/');
    runner.setContractId(contractId);

    log('starts chrome');

    login()
        .then(() => {
            log('logged in');
            runner.refreshAvailability();
            return runner.start();
        });


})();


