(async function () {

    // return ['navigate', 'take_screenshot'];

    const common = this.common;
    await common.focusOnInput('input1');
    await common.type('hi');
    await common.type('love');
    await common.enter();
    // await common.clearInput();

    await this.takeScreenshotLatest();

    return [];

}).call(this);