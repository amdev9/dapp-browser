import {
    getDefaultExecPath,
    TaskProcess,
    Keychain,
    Queue,
    Task,
} from "../src/keychain";

import { expect, assert } from "chai";
import { platform } from "os";
import "mocha";

const KEYCHAIN_PATH = getDefaultExecPath();

function kill_with_done(keychain: Keychain, done: Mocha.Done, error?: Error) {
    keychain.queue.keychain.kill('SIGINT');
    done(error);
}

describe("#Keychain", () => {
    it("#create", (done) => {
        let instance = new Keychain(KEYCHAIN_PATH);

        instance.create("some_key", Keychain.Cipher.AES256, Keychain.Curve.SECP256K1)
            .then((result: any) => {
                assert.equal(result, true);
                kill_with_done(instance, done);
            })
    });

    it("#list", (done) => {
        let instance = new Keychain(KEYCHAIN_PATH);

        instance.list()
            .then((result: string[]) => {
                expect([ "some_key" ]).to.deep.equal(result)
                kill_with_done(instance, done);
            })
    });

    it("#sign", (done) => {
        let instance = new Keychain(KEYCHAIN_PATH);

        instance.sign(
            "some_key",
            "de5f4d8974715e20f47c8bb609547c9e66b0b9e31d521199b3d8d6af6da74cb1",
            "871689d060721b5cec5a010080841e00000000000011130065cd1d0000000000000000"
        )
            .then((signed: string) => {
                expect(130).to.equal(signed.length);
                kill_with_done(instance, done);
            })
    });

    it("#should panic (key is exists)", (done) => {
        let instance = new Keychain(KEYCHAIN_PATH);

        instance.create("some_key", Keychain.Cipher.AES256, Keychain.Curve.SECP256K1)
            .catch((error: Error) => {
                expect("Error: keyfile for this user is already exist").to.equal(error.message);
                kill_with_done(instance, done);
            })
    });

    it("#sould panic of keychain", (done) => {
        let instance = new Keychain("/bin/sh");

        instance.list()
            .catch((error: Error) => {
                expect("keychain process exited with code (retry 3): 127").to.equal(error.message);
                kill_with_done(instance, done);
            })
    });

    it("#test path getter", (done) => {
        let instance = new Keychain();
        const info = platform();
    
        switch (info) {
            case "linux":
                assert.equal(instance.path, "./bin/keychain.ubuntu");
                break;
            case "darwin":
                assert.equal(instance.path, "./bin/keychain.macos");
                break;
            case "win32":
                assert.equal(instance.path, "bin/keychain.exe");
                break;            
            default:
                assert.equal(instance.path, "unknown");
        }

        kill_with_done(instance, done);
    })
});
