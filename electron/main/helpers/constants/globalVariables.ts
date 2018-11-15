import { BrowserView } from 'electron';

export type ChannelsConf = string[];
export type BindedConf = Map<string, ChannelsConf>;
export type BindedListConf = BindedConf[];

export interface RendererConf {
  id: string;
  name?: string;
  status: 'permission_manager' | 'client' | 'dapp';
  winId: number;
  dappView?: BrowserView;
  intent?: string;
  binded?: BindedListConf;
}

export const globalUUIDList: RendererConf[] = [];

// This application opens links that start with this protocol
export const PROTOCOL_PREFIX = 'arr';
export const PROTOCOL = `${PROTOCOL_PREFIX}://`;
