export default (initialState, handlers) => {
  return (state = initialState, action) => {
    if (action && Object.keys(handlers).includes(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};