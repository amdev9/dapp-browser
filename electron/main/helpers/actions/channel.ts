import { Action } from 'redux';

export interface ChannelAction extends Action {
  type: string;
  payload?: {
    uuid?: string;
    uuidRec?: string,
    uuidSend?: string
  };
  // uuid?: string;
}

