// validate permissions for actions
const validatePermissionAction = () => next => (action) => {

  //TODO validate action status
  if (action.type == 'INCREMENT_COUNTER') {
    console.log(action);
    // action.type = 'DECREMENT_COUNTER';
    return next(action);
  } else if (action.type == 'DECREMENT_COUNTER') {
    console.log(action);
    return next(action);

  } else if (action.type == 'SWITCH_DAPP') {
      console.log(action);
      return next(action);
  } else {
    // restrict unknown action
    console.log('Canceled');
  }
};

module.exports = validatePermissionAction;
