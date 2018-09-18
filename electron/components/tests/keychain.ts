import {
    TaskProcess,
    Keychain,
    Queue,
    Task,
} from "../src/keychain";

import { expect, assert } from "chai";
import { platform } from "os";
import "mocha";

const KEYCHAIN_PATH = "./keychain.ubuntu.16.04";

describe("#Keychain", () => {
    it("#create", (done) => {
        let instance = new Keychain(KEYCHAIN_PATH);
        const resolve = (result: any) => {
            assert.equal(result, true);
            done();
        };

        instance.create("some_key", Keychain.Cipher.AES256, Keychain.Curve.SECP256K1)
            .then(resolve);
    });

    it("#list", (done) => {
        let instance = new Keychain(KEYCHAIN_PATH);
        const resolve = (result: any) => {
            assert.equal(result[0], "some_key");
            assert.equal(result.length, 1);
            done();
        };

        instance.list()
            .then(resolve);
    });

    it("#sign", (done) => {
        let instance = new Keychain(KEYCHAIN_PATH);
        const resolve = (result: any) => {
            assert.equal(!result.error, true)
            done()
        };

        instance.sign(
            "some_key",
            "de5f4d8974715e20f47c8bb609547c9e66b0b9e31d521199b3d8d6af6da74cb1",
            "871689d060721b5cec5a010080841e00000000000011130065cd1d0000000000000000"
        )
            .then(resolve);
    });

    it("#should panic (key is exists)", (done) => {
        let instance = new Keychain(KEYCHAIN_PATH);
        const reject = (error: Error) => done();

        instance.create("some_key", Keychain.Cipher.AES256, Keychain.Curve.SECP256K1)
            .catch(reject);
    });

    it("#sould panic of keychain", (done) => {
        let instance = new Keychain("/usr/bin/sh");
        const resolve = (result: any) => done(new Error("its alive!"));
        const reject = (error: Error) => done();

        instance.list()
            .then(resolve)
            .catch(reject);
    });

    it("#test path getter", (done) => {
        let instance = new Keychain();
        const info = platform();
    
        switch (info) {
            case "linux":
                assert.equal(instance.path, "./keychain.ubuntu.16.04");
                break;
            case "darwin":
                assert.equal(instance.path, "./keychain.macos");
                break;
            case "win32":
                assert.equal(instance.path, "keychain.exe");
                break;            
            default:
                assert.equal(instance.path, "unknown");
        }

        done();
    })
});