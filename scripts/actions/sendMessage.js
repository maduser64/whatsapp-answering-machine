let mouse, keyboard, page;

const inputs = {
    input1: [320, 115],
    input2: [476, 308],
    button: [632, 156],
};

function focusOnInput(name) {
    const coordinates = inputs[name];
    mouse.click(coordinates[0], coordinates[1]);
}

function clickOnInput(name) {
    return focusOnInput(name);
}

function backspace() {
    page.press('Backspace');
}

function enter() {
    page.press('Enter');
}

function keydown(key) {
    keyboard.down(key);
}

function keyup(key) {
    keyboard.up(key);
}

function sendCharacter(char) {
    keyboard.sendCharacter(char);
}

function type(string) {
    page.type(string);
}

(async function () {
    page = this.page;
    mouse = this.page.mouse;
    keyboard = this.page.keyboard;

    focusOnInput('input1');
    type('hello');
    enter();
    focusOnInput('input2');
    type('world');
    enter();
    clickOnInput('button');


}).call(this);
