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
    version: store.getState().data.version,
    dishes: store.getState().data.dishes,
  }));

  const courseTypes = store.getState().data.courseTypes;
  if (courseTypes) {
    window.localStorage.setItem('courseTypesCached', JSON.stringify(courseTypes));
  }

  return result;
};