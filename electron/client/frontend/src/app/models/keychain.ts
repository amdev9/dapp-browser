export interface KeychainItem {
  cipher: KeychainItem.Cipher
  curve: KeychainItem.Curve
  name: string
}

export namespace KeychainItem {
  export enum Cipher {
    AES256,
  }

  export enum Curve {
    SECP256K1,
  }
}

export interface KeychainSessionItem {
  type: KeychainSessionItem.Type,
  // Instant time in ms
  period?: number
}

export namespace KeychainSessionItem {
  export enum Type {
    // While app is running
    Running,
    // Keychain always grant use keychain
    Always,
    // Period for allow usage
    Period,
    // Newer allow use keys
    Never,
  }
}
