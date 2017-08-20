var casper = require('casper').create({
    // other options here
    viewportSize: {
        width: 1280,
        height: 768
    },
    verbose: true,
    logLevel: "info",
    pageSettings: {
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"
    }
});

casper.start('http://localhost:3000/');

casper.then(function() {
    this.echo('First Page: ' + this.getTitle());

    this.mouse.click(77, 182);
    this.mouse.click(490, 122);
    this.capture("typed1.png");
    this.sendKeys("input#name", "casperjs", { keepFocus: true, reset:true });
    this.capture("typed2.png");
    this.page.sendEvent("keypress", this.page.event.key.Enter);
});

casper.run();