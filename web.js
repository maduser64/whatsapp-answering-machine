const puppeteer = require('puppeteer');
const fs = require('fs');

let browser, page, mouse, id = 1;

const readFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./runScript.js', function read(err, data) {
            if (err) {
                reject(err);
            }

            resolve(data.toString());
        });
    });
};


let lastContent;

const step = async () => {
    const content = await readFile();

    if (content === lastContent) {
        return;
    }

    try {
        console.log('running -> ', true);
        eval(content);
    } catch (e) {
        console.log('e.message -> ', e.message);
    }

    lastContent = content;
};


(async () => {
    console.log('start -> ', true);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    mouse = page.mouse;
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36');
    await page.setViewport({width: 1280, height: 768});
    await page.goto('https://web.whatsapp.com/');
    await page.screenshot({path: 'example.png'});

    await setInterval(() => step(), 1000);
})();