const createTestCafe = require('testcafe');

function noop () {};

function reportTestDone (name, testRunInfo, meta) {
    console.log(`actual callsite.filename: ${testRunInfo.errs[0].callsite.filename}`);
}

const reporter = () => ({
    reportTaskStart:    noop,
    reportFixtureStart: noop,
    reportTestStart:    noop,
    reportTestDone:     reportTestDone,
    reportTaskDone:     noop
});

async function run () {
    const testcafe    = await createTestCafe('localhost', 1337, 1338);
    const runner      = testcafe.createRunner();
    const failedCount = await runner
        .src('failed test.js')
        .reporter(reporter)
        .browsers('chrome')
        .run();

    process.exit();
}

run();
