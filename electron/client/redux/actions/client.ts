export const SWITCH_DAPP = 'SWITCH_DAPP';
 
export function switchDapp(dappName: string) {
  return {
    type: SWITCH_DAPP,
    payload: { 
      targetDapp: dappName
    }
  };
}
 
export interface Action {
  type: string;
  payload?: {
    uuid?: string;
    uuidRec?: string,
    uuidSend?: string
  };
  // uuid?: string;
}