/**
 * Logs all actions and states after they are dispatched.
 */

export default store => next => action => {
  if (process.env.NODE_ENV === 'development') {
    console.log('%caction', 'color: blue; font-weight: 800', action); // eslint-disable-line no-console
  }
  window.store = store;
  const result = next(action);
  window.state = store.getState();
  return result;
};