export const SWITCH_DAPP = 'SWITCH_DAPP';
 
export function switchDapp(dappId: number, dappName: string) {
  return {
    type: SWITCH_DAPP,
    payload: { 
      targetDappId: dappId,
      targetDappName: dappName
    }
  };
}
 
export interface Action {
  type: string;
  payload?: {
    targetDappId: number,
    targetDappName: string
  };
}