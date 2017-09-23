const utils = require('./utils');
const {readFile, timestamp, checksum, wait,} = utils;
const puppeteer = require('puppeteer');
const common = require('./common');

const log = require('./log').logT;
const refreshStartTime = require('./log').refreshStartTime;

const {configureContract, fetchContract} = require('./contracts_api');
const {contractToText} = require('social-contracts/utils/contracts');

const debugMode = false;

class Runner {
    constructor(url, script_path = 'scripts/instructions.js', delta = 500) {
        this.script_path = script_path;
        this.lastHash = '';
        this.delta = delta;
        this.url = url;
        this.actionId = 0;
        this.common = common;

        this._interval = null;
        this._intervalFetch = null;

        this.step = this.step.bind(this);
        this.runAction = this.runAction.bind(this);
        this.takeScreenshot = this.takeScreenshot.bind(this);
        this.refreshAvailability = this.refreshAvailability.bind(this);
    }

    setContractId(contractId) {
        this.contractId = contractId;
        common.setContractId(contractId);
    }

    refreshAvailability() {
        log('fetching contract', this.contractId);
        configureContract(this.contractId);
        return fetchContract()
            .then(contract => contractToText(contract, 'he', true))
            .then(availability => {
                log('contract fetched', availability);
                this.availability = availability;
                common.setAvailability(availability);
            })
    }

    async start() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36');
        await page.setViewport({width: 1280, height: 699});

        this.setPage(page);
        this.common.setPage(page);

        await this.page.goto(this.url);

        this.play();
    }

    setPage(page) {
        log('settings page reference');
        this.page = page;
    }

    async play() {
        refreshStartTime();
        log('play');
        this._interval = setInterval(this.step, debugMode ? this.delta: 20000);
        // this._intervalFetch = setInterval(this.refreshAvailability, 30 * 1000);
    }

    runJS(js) {
        let result;

        try {
            result = eval(js);

        } catch (e) {
            log('error evaluating-> ', e.message);
        }

        return result;
    }

    async step() {
        const content = await readFile(this.script_path),
            hash = checksum(content);

        if (debugMode && hash === this.lastHash) {
            return;
        }

        if (hash !== this.lastHash) {
            log('new hash ' + hash);
        }

        this.lastHash = hash;

        const result = await this.runJS(content);
        this.runActions(result);
    }

    async takeScreenshot(filename, actionId) {
        if (actionId) {
            filename += '-after-' + actionId;
        }

        return await this.page.screenshot({path: 'screenshots/' + filename + '.png'});;
    }

    async takeScreenshotLatest() {
        return await this.page.screenshot({path: 'public/latest.png'});
    }

    async runAction(action, delay) {
        this.actionId++;
        log('run action', action, 'with delay', delay);
        const temp = await wait(delay);
        const content = await readFile('./scripts/actions/' + action + '.js');
        const result = this.runJS(content);
        log('result -> ', result);

        return this.takeScreenshotLatest();

    }

    runActions(actions) {
        log('run actions', actions);
        actions.forEach((action, index) => this.runAction(action, 5000 * index));
    }
}

module.exports = Runner;