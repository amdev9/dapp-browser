import {
    NetworkAPI,
    Network,
} from "../src/network";

import { expect, assert } from 'chai';
import { platform } from "os";
import 'mocha';

const BITSHARE_BACK_URI = "wss://bitshares.openledger.info/ws";

describe("#NetworkAPI", () => {
    let network = new NetworkAPI(BITSHARE_BACK_URI);
    afterEach((done) => { network.close().then(done); });

    it("#listen", (done) => {
        network.init().then(() => {
            const success = (block: NetworkAPI.Enriched) => {
                network.removeListener(success);
                done();
            };

            network.addListener(success);
        });
    });

    it("#remove listener", (done) => {
        const success = (block: NetworkAPI.Enriched) => {};
        network.addListener(success);
        assert.equal(network.listeners.length, 1);

        network.removeListener(success);
        assert.equal(network.listeners.length, 0);
        done();
    });
});

describe("#Network", () => {
    it("#getJSON", (done) => {
        // the method is a hardcore - it does not make sense to do a comparison on the result
        // because it simply reads the file.
        const success = (data: any) => done();
        let network = new Network();

        network.getJSON().then(success).catch(done)
    });
});