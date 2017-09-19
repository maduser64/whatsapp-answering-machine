


const clickOnFirst = () => {
    mouse.click(points.first.x, points.first.y);
};

const getTopPeople = async () => {
    console.log('true4 -> ', true);

    const doc = await page.$('.infinite-list-item');
    console.log('doc -> ', doc);



    console.log('true5 -> ', true);

    clickOnFirst();
};

const run = async () => {
    await page.screenshot({path: `example${id++}.png`});

    console.log('true1 -> ', true);
    await getTopPeople();
    console.log('true2 -> ', true);
    await mouse.click(points.first.x, points.first.y);
    console.log('true3 -> ', true);
};


run()
    .then(() => {});


