 
const validatePermissionAction = () => next => (action) => {
//   if (!validateAction(action)) return next(action);  // replace with permission
//   if (action.meta && action.meta.scope === 'local') return next(action);

  return next(action);
};

module.exports = validatePermissionAction;
