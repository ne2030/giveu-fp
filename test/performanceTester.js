const tester = (title, f, n) => {
    let i = 0;
    const start = new Date();
    for (; i < n; i += 1) {
        f();
    }
    const end = new Date();

    const time = (end - start) / 1000;
    console.log(`result :: ${title} :: ${time} sec`);
};

const testerAsync = async (title, f, n) => {
    let i = 0;
    const start = new Date();
    for (; i < n; i += 1) {
        await f();
    }
    const end = new Date();

    const time = (end - start) / 1000;
    console.log(`result :: ${title} :: ${time} sec`);
};

module.exports = {
    tester, testerAsync
};
