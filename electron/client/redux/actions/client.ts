export const SWITCH_DAPP = 'SWITCH_DAPP';
 
export function switchDapp(dappName) {
  return {
    type: SWITCH_DAPP,
    payload: { 
      targetDapp: dappName
    }
  };
}
 
 