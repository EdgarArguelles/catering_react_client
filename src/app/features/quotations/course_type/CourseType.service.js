/**
 * Get only active CourseTypes
 *
 * @param {array} courseTypes list of all courseTypes (it could be object or array)
 * @return {array} CourseTypes list including only active
 */
export const getActiveCourseTypes = courseTypes => {
  const array = courseTypes || [];
  const courseTypesList = Array.isArray(array) ? [...array] : Object.values(array);
  return courseTypesList.filter(courseType => courseType.status > 0);
};

/**
 * Get sorted CourseTypes list by position
 *
 * @param {array} courseTypes list of all courseTypes (it could be object or array)
 * @param {boolean} shouldIncludeInactive if true returns a list including inactive courseTypes
 * @return {array} sorted CourseTypes list
 */
export const getSortedCourseTypes = (courseTypes, shouldIncludeInactive) => {
  const array = courseTypes || [];
  let courseTypesList = Array.isArray(array) ? [...array] : Object.values(array);
  if (!shouldIncludeInactive) {
    courseTypesList = getActiveCourseTypes(courseTypesList);
  }
  return courseTypesList.sort((a, b) => a.position - b.position);
};

/**
 * Get the current CourseType according with selected tab
 *
 * @param {array} allCourseTypes list of all courseTypes (it could be object or array)
 * @param {number} selectedTab tab index that is currently selected
 * @return {object} CourseType object associated with the selected tab
 */
export const getCurrentCourseType = (allCourseTypes, selectedTab = 0) => {
  const sortedCourseTypes = getSortedCourseTypes(allCourseTypes, false);
  return selectedTab >= sortedCourseTypes.length ? sortedCourseTypes[sortedCourseTypes.length - 1]
    : sortedCourseTypes[selectedTab];
};

/**
 * Get all dishes associated to CourseType
 *
 * @param {array} allDishes list of all dishes (it could be object or array)
 * @param {object} courseType CourseType object
 * @return {array} dishes list associated to CourseType
 */
export const getCourseTypeDishes = (allDishes, courseType) => {
  const array = allDishes || [];
  const allDishesList = Array.isArray(array) ? [...array] : Object.values(array);
  return allDishesList.filter(dish => courseType && dish.courseTypeId === courseType.id);
};

/**
 * Get all dishes associated with current CourseType
 *
 * @param {array} allDishes list of all dishes (it could be object or array)
 * @param {array} allCourseTypes list of all courseTypes (it could be object or array)
 * @param {number} selectedTab tab index that is currently selected
 * @return {array} dishes list associated with current CourseType
 */
export const getCurrentCourseTypeDishes = (allDishes, allCourseTypes, selectedTab) => {
  const courseType = getCurrentCourseType(allCourseTypes, selectedTab);
  return getCourseTypeDishes(allDishes, courseType);
};

/**
 * Check if the courseType uses multiple dishes
 *
 * @param {object} courseType CourseType object
 * @return {boolean} true if this courseType uses multiple dishes
 */
export const useMultipleDishes = courseType => {
  return !!courseType && courseType.name === 'Plato Fuerte';
};