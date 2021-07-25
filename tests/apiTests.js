const addContext = require('mochawesome/addContext');
const wbListener = require('../hooksListener/WebhookListener');
const axios = require('axios');
const expect = require('chai').expect;
const listener = new wbListener();

let hooksUrl;

const requestData = {
    firstName: 'webhook',
    lastName: 'tester'
}

before("Start hooks listener", async () => {
    hooksUrl = await listener.setup();
})

describe("Test hooks API", () => {
    it(`Should be able to push a message to web hook exposed over internet`, async function () {
        addContext(this,`Going to post a message at ${hooksUrl.url}`);
        const resp = await axios.request({
            method: 'post',
            url: hooksUrl.url,
            data: requestData,
            headers: {
                testHeader: 'test value'
            }
        });
        addContext(this,"Message posted successfully");
        expect(resp).to.exist;
        expect(resp.status).to.eq(200);
    });
    it("Should be able to retrieve previously posted message from webhook URL", async function () {
        addContext(this,`Going to fetch messages from ${hooksUrl.url}`);
        const resp = await axios.request({
            method: 'get',
            url: hooksUrl.url
        });
        addContext(this,"Message fetched successfully");
        expect(resp).to.exist;
        expect(resp.status).to.eq(200);
        expect(resp.data.hooks[0].body).to.deep.eq(requestData);
        expect(resp.data.hooks[0].headers.testheader).to.eq('test value');
    });
    it('Should be able to fetch and clear previously posted message to the webhook', async function () {
        addContext(this,`Going to fetch and clear messages from ${hooksUrl.url}`);
        let resp = await axios.request({
            method: 'get',
            url: `${hooksUrl.url}?clear=true`
        })
        addContext(this,"Message fetched successfully");
        expect(resp).to.exist;
        expect(resp.status).to.eq(200);
        expect(resp.data.hooks).to.have.length(1);
        resp = await axios.request({
            method: 'get',
            url: hooksUrl.url
        });
        expect(resp).to.exist;
        expect(resp.status).to.eq(200);
        expect(resp.data.hooks).to.have.length(0);
    });
})

after("Stop hooks listener", async () => {
    await listener.stop();
})
