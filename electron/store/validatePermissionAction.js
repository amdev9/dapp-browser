 
const validatePermissionAction = () => next => (action) => {
//   if (!validateAction(action)) return next(action);  // replace with permission
//   if (action.meta && action.meta.scope === 'local') return next(action);

  if (action.type == 'INCREMENT_COUNTER') {
    console.log(action);
    // action.type = 'DECREMENT_COUNTER';
    return next(action);
  } else {
    console.log('Canceled');
  }
};

module.exports = validatePermissionAction;
