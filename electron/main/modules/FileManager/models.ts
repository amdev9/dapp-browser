export type FileId = string;
export type Path = string;

export interface FileEntry {
  id: string;
  path?: string;
  name?: string;
}

export type PathList = Path[];

export interface FileObject {
  name: string;
  path: string;
  hash: Buffer | string;
  size: number;
  content?: Buffer;
  type: 'file' | string;
}
