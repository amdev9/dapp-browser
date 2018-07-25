export const SWITCH_DAPP = 'SWITCH_DAPP';
 
export function switchDapp(dappId: string) {
  return {
    type: SWITCH_DAPP,
    payload: { 
      targetDappId: dappId
    }
  };
}
 
export interface Action {
  type: string;
  payload?: {
    targetDappId: string
  };
}