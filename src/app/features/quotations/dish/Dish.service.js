/**
 * Check if all dishes in dishes list are present in allDishes object
 *
 * @param {array} dishes array of dishes with [{id: 'id1'}, {id: 'id2'}] structure (it could be object or array)
 * @param {object} allDishes collection of all dishes already present in data
 * @return {boolean} true if all dishes in dishes list are present in allDishes object
 */
export const areAllDishesPresent = (dishes, allDishes) => {
  const array = dishes || [];
  const dishesList = Array.isArray(array) ? [...array] : Object.values(array);
  return !!allDishes && dishesList.filter(d => allDishes[d.id]).length === dishesList.length;
};

/**
 * Get only active Dishes
 *
 * @param {array} dishes list of all dishes (it could be object or array)
 * @return {array} dishes list including only active
 */
export const getActiveDishes = dishes => {
  const array = dishes || [];
  const dishesList = Array.isArray(array) ? [...array] : Object.values(array);
  return dishesList.filter(dish => dish.status > 0);
};

/**
 * Check if dish's id is in menu
 *
 * @param {array} menuCourses list of menu's courses
 * @param {string} dishId dish's id to search
 * @return {boolean} true if dish's id is in menu
 */
const isDishAddedInMenu = (menuCourses, dishId) => {
  const array = menuCourses || [];
  let isAdded = false;
  array.forEach(course => {
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

/**
 * Calculate and get the price for a dish's list
 *
 * @param {array} dishes array of dishes with [{id: 'id1'}, {id: 'id2'}] structure
 * @param {object} allDishes collection of all dishes already present in data
 * @return {number} calculated price
 */
export const getDishesPrice = (dishes, allDishes) => {
  const array = dishes || [];

  return array.reduce((accumulator, {id}) => {
    const dish = allDishes ? allDishes[id] : undefined;
    return dish && dish.price ? accumulator + dish.price : accumulator;
  }, 0);
};

/**
 * Call fetchDish function with all dishes's id in dishes list when id is not already present in allDishes collection
 * and avoiding to call same endpoint twice
 *
 * @param {array} dishes array of dishes with [{id: 'id1'}, {id: 'id2'}] structure
 * @param {object} allDishes collection of all dishes already present in data
 * @param {object} dishFetching object with dish's ids that were already called
 * @param {func} fetchDish function to call for each dish's id
 * @return {void}
 */
export const fetchDishesList = (dishes, allDishes, dishFetching, fetchDish) => {
  const array = dishes || [];

  array.forEach(({id}) => {
    // for each dish's id, check if data already is in dishes
    // and avoid to call same endpoint if a previous call is fetching
    if ((!allDishes || !allDishes[id]) && (!dishFetching || !dishFetching[id])) {
      fetchDish && fetchDish(id);
    }
  });
};