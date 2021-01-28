/**
 * Get sorted CourseTypes list by position
 *
 * @param {array} courseTypes list of all courseTypes
 * @return {array} sorted CourseTypes list
 */
export const getSortedCourseTypes = courseTypes => {
  const array = courseTypes || [];
  return [...array].sort((a, b) => a.position - b.position);
};

/**
 * Get the current CourseType according with selected tab
 *
 * @param {array} allCourseTypes list of all courseTypes
 * @param {number} selectedTab tab index that is currently selected
 * @return {object} CourseType object associated with the selected tab
 */
export const getCurrentCourseType = (allCourseTypes, selectedTab = 0) => {
  const sortedCourseTypes = getSortedCourseTypes(allCourseTypes);
  return selectedTab >= sortedCourseTypes.length ? sortedCourseTypes[sortedCourseTypes.length - 1]
    : sortedCourseTypes[selectedTab];
};

/**
 * Check if the courseType uses multiple dishes
 *
 * @param {object} courseType CourseType object
 * @return {boolean} true if this courseType uses multiple dishes
 */
export const useMultipleDishes = courseType => !!courseType && courseType.name === 'Plato Fuerte';