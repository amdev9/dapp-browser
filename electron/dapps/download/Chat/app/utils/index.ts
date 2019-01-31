export const getHashLink = (hash: string = '', fileName: string = '') => `<IpfsLink filename="${fileName}" hash="${hash}"/>`;

export const getIpfsUploadLink = (fileEntryId: string, msgId: string) =>
  `<ipfsUploadLink fileEntryId="${fileEntryId}" messageId="${msgId}" />`
