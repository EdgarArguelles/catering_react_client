import isEqual from 'lodash/isEqual';
import Utils from 'app/common/Utils';

/**
 * Check if a quotation is started
 *
 * @param {object} quotation quotation information
 * @return {boolean} true if a quotation is started
 */
export const isQuotationStarted = quotation => {
  return !!quotation && (quotation.name !== '' ||
    (!!quotation.menus && quotation.menus.find(menu => menu.isSelected) !== undefined));
};

/**
 * Get Edit Menu path or Edit Quotation path
 *
 * @param {object} quotation quotation information
 * @return {string} get Edit Menu path if a Menu is started, otherwise returns Edit Quotation path
 */
export const getEditPath = quotation => {
  return quotation?.menus?.find(menu => menu.isSelected) ? '/presupuestos/menu/editar' : '/presupuestos/editar';
};

/**
 * Clean and sort a quotation in order to be compared
 *
 * @param {object} quotation data to be cleaned
 * @return {object} cleaned quotation
 */
const cleanMenus = quotation => {
  if (quotation) {
    return {
      ...quotation,
      price: null,
      menus: quotation?.menus?.map(menu => ({
        ...menu,
        price: null,
        isSelected: null,
        courses: menu.courses.map(course => ({...course, dishes: null}))
          .sort(Utils.getSortString('id', (a, b) => a.position - b.position)),
      })).sort(Utils.getSortString('name')),
    };
  }

  return null;
};

/**
 * Clean, sort and determine if two quotation objects are equals
 *
 * @param {object} quotation1 quotation object to be evaluated
 * @param {object} quotation2 quotation object to be evaluated
 * @return {boolean} true if both quotation objects are equals
 */
export const areEqual = (quotation1, quotation2) => isEqual(cleanMenus(quotation1), cleanMenus(quotation2));