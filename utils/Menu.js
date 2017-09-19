const readline = require('readline');

const options = [
    {
        id: 1,
        title: 'new page',
        script: 'new_page',
        afterRun: 'this.setPage(result)'
    },
    {
        id: 2,
        title: 'navigate',
        script: 'navigate',
    },
    {
        id: 3,
        title: 'take screenshot',
        script: 'take_screenshot',
    }];

class Menu {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        this.options = options;
    }

    showOptions() {
        this.options.forEach(option => {
            console.log('[' + option.id + '] ' + option.title);
        })
    }

    close() {
        this.rl.close();
    }

    ask() {
        this.showOptions();
        return this.rl.question('Which action to run?');
    }
}

module.exports = Menu;
