export class DappManifestError extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, DappManifestError);
    this.name = 'DappManifestError';
    this.message = message;
  }
}

export class DappDublicate extends Error {
  constructor(dappName: string) {
    super();
    Error.captureStackTrace(this, DappManifestError);
    this.name = 'DappManifestError';
    this.message = `Dublicate of dapp ${dappName}`;
  }
}
