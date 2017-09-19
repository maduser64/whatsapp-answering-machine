const log = require('./log').logT;

const template = '* הודעה אוטומטית * הי אני לא זמין כרגע בוואטסאפ אבל אהיה זמין $$$. טרם קראתי את ההודעה שלך. שעות הזמינות שלי הן: $$';
const templateLink = 'https://socialcontracts.io/#/$$$?$$';

const random100 = () => Math.floor(Math.random() * 100);

const autoMessage = (when, link) => template.replace('$$$', when).replace('$$', link);
const contractLink = (contractId) => templateLink.replace('$$$', contractId).replace('$$', random100());

let page, mouse, keyboard;
let contractId, availability;

const inputs = {
    input1: [320, 115],
    input2: [476, 308],
    button: [632, 156],
};

const points = {
    first: {x: 183, y: 144},
    second: {x: 183, y: 216},
    third: {x: 183, y: 294},
};

function setPage(_page) {
    page = _page;
    mouse = _page.mouse;
    keyboard = _page.keyboard;
}

function setAvailability(_availability) {
    availability = _availability;
}

function setContractId(_contractId) {
    contractId = _contractId;
}

const sendAutoMessage = async () => {
    const when = availability.whatsapp,
        link = contractLink(contractId),
        message = autoMessage(when, link);

    if (when === 'זמין עכשיו') {
        return;
    }

    console.log('message -> ', message);

    await clickNear([637, 668]);
    await writeText(message);
    await enter();
};


async function wait(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, delay)
    })
}

function rnd(max, min = 0) {
    return min + (Math.random() * (max - min));
}

function rndDelta(delta) {
    return rnd(delta, -delta);
}

function smallDelay() {
    return rnd(83, 11);
}

function mediumDelay() {
    return rnd(110, 43);
}

function longDelay() {
    return rnd(710, 48);
}

async function writeText(text) {
    for (let i = 0; i < text.length; i++) {
        const char = text[i],
            delta = mediumDelay();

        await sendCharacter(char, delta);
    }
}

async function click(coordinates, delay) {

    if (!delay) {
        delay = smallDelay();
    }

    return await mouse.click(coordinates[0], coordinates[1], {delay});
}

async function clickNear(coordinates, nearDelta) {

    if (!nearDelta) {
        nearDelta = [50, 4];
    }

    const dx = rndDelta(nearDelta[0]),
        dy = rndDelta(nearDelta[1]);

    coordinates[0] = coordinates[0] + dx;
    coordinates[1] = coordinates[1] + dy;

    return await click(coordinates);
}

async function clickOnFirst() {
    return await click([points.first.x, points.first.y]);
}

async function clickOnSecond() {
    return await click([points.second.x, points.second.y]);
}

async function clickOnThird() {
    return await click([points.third.x, points.third.y]);
}

async function focusOnInput(name) {
    const coordinates = inputs[name];
    return await mouse.click(coordinates[0], coordinates[1]);
}

async function clickOnInput(name) {
    return focusOnInput(name);
}

async function press(key, delay) {

    if (!delay) {
        delay = longDelay();
    }

    await wait(delay);

    delay = smallDelay();

    return await page.press(key, {delay});
}

async function backspace() {
    return await press('Backspace');
}

async function enter() {
    return await press('Enter');
}

async function arrowLeft() {
    return await press('ArrowLeft');
}

async function selectInputText(cnt = 50) {
    await keydown('Shift');
    for (let i = 0; i < cnt; i++) {
        await arrowLeft();
    }
    await keyup('Shift');
    return await backspace();
}

async function clearInput(cnt = 50) {
    for (let i = 0; i < cnt; i++) {
        await backspace();
    }
}

async function keydown(key) {
    return await keyboard.down(key);
}

async function keyup(key) {
    return await keyboard.up(key);
}

async function sendCharacter(char, delay) {
    if (!delay) {
        delay = longDelay();
    }
    await wait(delay);

    return await keyboard.sendCharacter(char);
}

async function type(string, delay) {
    if (!delay) {
        delay = longDelay();
    }

    return await page.type(string, {delay});
}

async function getChatDetails() {
    return await page.evaluate(() => {
        let divs = [...document.querySelectorAll('.infinite-list-item')];

        const arr = divs.map((div) => {
            const chatTitle = div.querySelector('.chat-title span'),
                timestamp = div.querySelector('.chat-meta .timestamp'),
                style = div.style || {zIndex: 0},
                zIndex = parseInt(style.zIndex|| 0, 10);

            return {zIndex, chatTitle: chatTitle.innerHTML, timestamp: timestamp.innerHTML}
        }).sort(function (a, b) {
            if (a.zIndex === b.zIndex) {
                return 0;
            }

            return a.zIndex > b.zIndex ? -1 : 1;
        })

        return Promise.resolve(arr);
    });
}

function cleanName(name) {
    name = name.replace(/<!-- react-text: \d+ -->/gi, '');
    name = name.replace('<!-- /react-text -->', '');
    return name;
}

function cleanArray(arr) {
    return arr.map(item => {
        return {
            chatTitle: cleanName(item.chatTitle),
            timestamp: item.timestamp,
            zIndex: item.zIndex
        }
    })
}

const timestamp = () => (new Date()).getTime();

let lastSend = {};

const getLastSend = (contactName) => lastSend[contactName] || 0;
const timeSinceLastSend = (contactName) => Math.floor((timestamp() - getLastSend(contactName)) / 1000);

const groupsKeywords = ['משפחה', 'יסודות', 'אהרונסון'];


const keywordsExist = (string) => {
    const newGroups = groupsKeywords
        .filter(keyword => string.indexOf(keyword) < 0);

    return newGroups.length === groupsKeywords.length;

}

function filterGroups(arr) {
    return arr.filter(item => keywordsExist(item.chatTitle));
}

let lastTimestamps = {}, lastTimestamp, lastChatTitle;

async function checkChangesForChat(chat) {
    log(chat.chatTitle, chat.timestamp);

    const change = lastTimestamp !== chat.timestamp || lastChatTitle !== chat.chatTitle;

    if (!change) {
        log('no change', lastTimestamp, chat.timestamp, chat.chatTitle);
        return;
    }

    const secondSinceSentToThisContact = timeSinceLastSend(chat.chatTitle);

    if (secondSinceSentToThisContact < 8 * 60 * 60) {
        log('change, but contact already received message ' + secondSinceSentToThisContact + ' seconds ago. aborting.');
        lastTimestamps[chat.chatTitle]  = chat.timestamp;
        return;
    } else {
        log('change, sending message (last time sent ' + secondSinceSentToThisContact + ' seconds ago)');
    }

    await clickOnFirst();
    await sendAutoMessage();

    lastSend[chat.chatTitle] = timestamp();
    lastTimestamp = chat.timestamp;
    lastChatTitle = chat.chatTitle;
}

async function checkGroupNames() {
    return await getChatDetails()
        .then(response => cleanArray(response))
        .then(response => filterGroups(response))
        .then(response => checkChangesForChat(response[0]));
}

module.exports = {
    setPage,
    focusOnInput,
    clickOnInput,
    backspace,
    enter,
    keydown,
    keyup,
    sendCharacter,
    type,
    clearInput,
    click,
    clickNear,
    getChatDetails,
    clickOnFirst,
    clickOnSecond,
    clickOnThird,
    writeText,
    setContractId,
    setAvailability,
    sendAutoMessage,
    checkGroupNames,
};