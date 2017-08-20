var fs = require('fs');
var cookieFilename = 'COOKIES.txt';
var cookies = require('./cookies/cookies');

function saveCookie() {
    var cookies = JSON.stringify(phantom.cookies);
    fs.write(cookieFilename, cookies, 644);
}

function restoreCookies() {
    var data = fs.read(cookieFilename);
    phantom.cookies = JSON.parse(data);
}

var casper = require('casper').create({
    // other options here
    viewportSize: {
        width: 1280,
        height: 768
    },
    verbose: true,
    logLevel: "info",
    pageSettings: {
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36"
    }
});


casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36");


function waitForBarcode() {
    this.waitFor(function check() {
        console.log('true -> ', document.querySelector('img'));
        return document.querySelector('img') !== null;
    }, function then() {
        console.log('true -> ', true);
        this.capture("whatsapp.png");
    }, function timeout() {
//...
    }, 40 * 1000);
}

function addCookie(name, value, domain) {
    console.log('name -> ', name);

    phantom.addCookie({
        'name': name,
        'value': value,
        'domain': domain
    });
}

function setCookies() {
    Object.keys(cookies).forEach(function (key) {
        var cookie = cookies[key];

        addCookie(cookie.name, cookie.value, cookie.domain);
    })
}

casper.options.waitTimeout = 40 * 1000;

casper.start('https://web.whatsapp.com/');



casper.then(function () {
    this.echo('First Page: ' + this.getTitle());

    this.mouse.click(77, 182);


    casper.wait(25000, function() {
        this.echo('after 5 seconds');
        this.capture("whatsapp.png");
    });



})
;

casper.run();