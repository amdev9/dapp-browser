import {
    NetworkAPI,
    Network,
} from "../src/network";

import { expect, assert } from 'chai';
import { platform } from "os";
import 'mocha';

const BITSHARE_BACK_URI = "wss://bitshares.openledger.info/ws";

describe("#NetworkAPI", () => {
    it("#listen", (done) => {
        let network = new NetworkAPI(BITSHARE_BACK_URI);
        
        network.init().then(() => {
            const success = (block: NetworkAPI.Enriched) => done();
            network.addListener(success);
        });
    });

    it("#remove listener", (done) => {
        let network = new NetworkAPI(BITSHARE_BACK_URI);
        
        network.init().then(() => {
            const success = (block: NetworkAPI.Enriched) => {};
            network.addListener(success);
            assert.equal(network.listeners.length, 1);
            network.removeListener(success);
            assert.equal(network.listeners.length, 0);
            done();
        });
    });
});

describe("#Network", () => {
    it("#getJSON", (done) => {
        const success = (data: any) => done();
        let network = new Network();

        network.getJSON().then(success).catch(done)
    });
});