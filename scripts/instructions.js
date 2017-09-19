



(async function () {

    const common = this.common;

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

    // this.refreshAvailability();

    await common.checkGroupNames();
    await this.takeScreenshotLatest();

    return [];

}).call(this);