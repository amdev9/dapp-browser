export type AppItem = {
  id?: number;
  appName: string;
  main: string;
  icon: string;
  statusIcon?: string[];
  preview: string;
  installed?: boolean;
  categories?: string[];
  permissions?: string[];
  title: string;
  hash?: string;
};

export interface ReadyDapp {
  name: string;
  uuid: string;
}

export type DappDownloadEntity = {
  hash: string;
  appName: string;
  preview?: string;
  categories?: string[];
  permissions?: string[];
  installed?: boolean;
};
