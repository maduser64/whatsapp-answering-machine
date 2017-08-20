const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const mouse = await page.mouse;
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36');
    await page.setViewport({width: 1280, height: 768});
    await page.goto('https://web.whatsapp.com/');
    await page.screenshot({path: 'example2.png'});

    // await page.waitForSelector('img');

    // await mouse.click(10, 20);

    // console.log('clicked -> ', true);

    // browser.close();
})();