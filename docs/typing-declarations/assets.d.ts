import * as IPFS from 'ipfs'

export namespace Assets {
  type FileNames = string;

  export enum Loader {
    Json,
    Text,
    Base64,
    File,
  }

  export abstract class Asset {
    // Get deserialized data
    payload(): any;
    // Get asset name
    name(): string;

    // Set new loader for deserialize
    loader(type: Loader): boolean;
    // Get current loader
    loader(): Loader;
  }
}

export abstract class Assets {
  // Load assets into dapp, from exists assets in bundle
  load(type: Assets.Loader, path: string): any;
  // Add remote asset to assets list for usage
  addRemote(addr: IPFS.Multiaddr): void;
  // List all assets in bundle & remote repos
  list(): Assets.FileNames[];
}