



(async function () {

    const common = this.common;

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

    await this.takeScreenshotLatest();

    // this.refreshAvailability();
    // await common.getChatDetails()
    //     .then(response => {console.log(response)})

    await common.checkGroupNames();


    return [];

}).call(this);