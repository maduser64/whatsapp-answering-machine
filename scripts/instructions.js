



(async function () {

    const common = this.common;

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

    // this.refreshAvailability();
    // await common.getChatDetails()
    //     .then(response => {console.log(response)})

    await common.checkGroupNames();
    await this.takeScreenshotLatest();

    return [];

}).call(this);