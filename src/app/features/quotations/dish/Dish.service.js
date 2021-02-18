/**
 * Check if dish's id is in menu
 *
 * @param {array} menuCourses list of menu's courses
 * @param {string} dishId dish's id to search
 * @return {boolean} true if dish's id is in menu
 */
const isDishAddedInMenu = (menuCourses, dishId) => {
  let isAdded = false;
  menuCourses?.forEach(course => {
    if (isAdded) {
      return;
    }

    isAdded = !!course.dishes && course.dishes.map(d => d.id).includes(dishId);
  });
  return isAdded;
};

/**
 * Check if dish's id is in MultipleDishesDialog's dishes list
 *
 * @param {array} dishesList list of dishes
 * @param {string} dishId dish's id to search
 * @return {boolean} true if dish's id is in MultipleDishesDialog's dishes list
 */
const isDishAddedInMultipleDishesDialog = (dishesList, dishId) => {
  return !!dishesList && dishesList.map(d => d.id).includes(dishId);
};

/**
 * Check if dish's id is in menu when MultipleDishesDialog is closed or
 * in MultipleDishesDialog's dishes list if dialog is opened
 *
 * @param {object} multipleDishesDialog object with MultipleDishesDialog's information
 * @param {array} menuCourses list of menu's courses
 * @param {string} dishId dish's id to search
 * @return {boolean} true if dish's id is in menu when MultipleDishesDialog is closed or
 * in MultipleDishesDialog's dishes list if dialog is opened
 */
export const isDishAdded = (multipleDishesDialog, menuCourses, dishId) => {
  return multipleDishesDialog && multipleDishesDialog.isMultipleDishesDialogOpen ?
    isDishAddedInMultipleDishesDialog(multipleDishesDialog.dishes, dishId) :
    isDishAddedInMenu(menuCourses, dishId);
};