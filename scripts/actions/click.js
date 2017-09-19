(async function () {
    const common = this.common;

    common.focusOnInput('input1');
    common.type('hello');
    common.enter();
    common.focusOnInput('input2');
    common.type('world');
    common.enter();
    common.clickOnInput('button');

}).call(this);
