/**
 * Storage main application's states temporally in this browser.
 */

export default store => next => action => {
  const result = next(action);
  window.localStorage.setItem('appTheme', store.getState().app.theme);
  window.sessionStorage.setItem('quotationsState', JSON.stringify({
    ...store.getState().quotations,
    isRemoteProcessing: false, // don't save isRemoteProcessing value
  }));
  window.localStorage.setItem('dataState', JSON.stringify({
    dishes: store.getState().data.dishes,
  }));

  return result;
};