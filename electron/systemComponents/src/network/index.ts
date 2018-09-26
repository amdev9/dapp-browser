import { readFile } from "fs-extra";
export * from "./api";

export class Network {
    // hardcode source
    source: string;

    constructor() {
        this.source = "blockchain.json";
    }

    // Any because that hardcode
    async getJSON(): Promise<any> {
        let json = await readFile(this.source, "utf-8");
        let deserialized = JSON.parse(json);
        return deserialized;
    }
}