const points = {
    first: {x: 183, y: 144},
    second: {x: 183, y: 216},
    third: {x: 183, y: 294},
};


const clickOnFirst = () => {
    mouse.click(points.first.x, points.first.y);
};

const getTopPeople = async () => {
    console.log('true4 -> ', true);

    const doc = await page.$('.infinite-list-item');
    console.log('doc -> ', doc);

    await page.evaluate(() => {
        console.log('true6 -> ', true);
        let divs = [...document.querySelectorAll('.infinite-list-item')];
        return divs.map((div) => {
            const chatTitle = div.querySelector('.chat-title span'),
                timestamp = div.querySelector('.chat-meta .timestamp');

            console.log(chatTitle.title, timestamp.innerHTML);
        });
    });

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


