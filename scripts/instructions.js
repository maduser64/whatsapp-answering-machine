

(async function () {

    const common = this.common;

    await common.clickOnFirst();
    await common.sendAutoMessage(common);

    await this.takeScreenshotLatest();

    return [];

}).call(this);