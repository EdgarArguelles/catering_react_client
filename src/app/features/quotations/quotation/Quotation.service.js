import isEqual from 'lodash/isEqual';
import Utils from '../../../common/Utils';

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
  return quotation && quotation.menus && quotation.menus.find(menu => menu.isSelected) !== undefined ?
    '/presupuestos/menu/editar' : '/presupuestos/editar';
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
      menus: !quotation.menus ? null : quotation.menus.map(menu => ({
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
export const areEqual = (quotation1, quotation2) => {
  return isEqual(cleanMenus(quotation1), cleanMenus(quotation2));
};

/**
 * Call fetchQuotation function when quotation has id and its not already present or its incomplete
 * and avoiding to call same endpoint twice
 *
 * @param {object} quotation quotation to load
 * @param {boolean} isFetching flag to know if function is already called
 * @param {object} quotations collection of all quotations already present in data
 * @param {func} fetchQuotation function to call
 * @return {void}
 */
export const fetchCompleteQuotation = (quotation, isFetching, quotations, fetchQuotation) => {
  // only call when quotation has id and isn't present or is incomplete
  // and avoid to call same endpoint if a previous call is fetching
  if (!isFetching && quotation && quotation.id &&
    (!quotations || !quotations[quotation.id] || !quotations[quotation.id].menus)) {
    fetchQuotation && fetchQuotation(quotation.id);
  }
};