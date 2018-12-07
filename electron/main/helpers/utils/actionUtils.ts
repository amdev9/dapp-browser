type ActionTypes = { [actionType: string]: string };

export const getModuleActionTypes = (actionTypes: ActionTypes): string[] => {
  return actionTypes && Object.keys(actionTypes).map(key => actionTypes[key]) || [];
};
