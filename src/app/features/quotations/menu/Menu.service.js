/**
 * Generate a random menu id
 *
 * @return {string} random menu id generated
 */
export const getRandomMenuId = () => {
  return `local-${Math.random().toString(36).substring(2)}`;
};

/**
 * Generate a link with a menu information
 *
 * @param {object} menu menu to share
 * @return {string} generated link
 */
export const getShareMenuLink = menu => {
  if (!menu) {
    return null;
  }

  const {name, price, quantity, courses} = menu;
  const coursesList = !courses ? '' : courses.reduce((accumulator, {position, type, dishes}) => {
    const dishesList = dishes.reduce((dishList, {id}) => `${dishList}${id},`, '');
    return `${accumulator}${position}.${type.id}.${dishesList.substring(0, dishesList.length - 1)}:`;
  }, '');

  const data = `${encodeURI(name ? name.replace(/;/g, '%') : '')};${price ? price : ''};${
    quantity ? quantity : ''};${coursesList.substring(0, coursesList.length - 1)}`;
  return `${window.location.origin}/presupuestos/menu/ver?menu=${data}`;
};

/**
 * Generate a Menu from a link with menu information
 *
 * @param {string} data link with menu information
 * @return {object} generated menu
 */
export const getMenuFromLink = data => {
  if (!data) {
    return null;
  }

  const [name, price, quantity, coursesList] = data.split(';');

  return {
    name: name ? name.replace(/%/g, ';') : '',
    price: price ? parseFloat(price) : 0.0,
    quantity: quantity ? parseInt(quantity, 10) : 0,
    courses: !coursesList ? [] : coursesList.split(':').map(course => {
      const [position, type, dishes] = course.split('.');
      return {
        position: position ? parseInt(position, 10) : 0,
        type: {id: type},
        dishes: !dishes ? [] : dishes.split(',').map(id => ({id})),
      };
    }),
  };
};