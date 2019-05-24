/**
 * Following the Flux Standard Action: https://github.com/acdlite/flux-standard-action
 */
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
  QUOTATION_CHANGE_NAME: null,
  QUOTATION_SELECT_MENU: null,
  QUOTATION_ADD_NEW_MENU: null,
  QUOTATION_ADD_MENU: null,
  QUOTATION_REMOVE_MENU: null,
  QUOTATION_SET_PRICE: null,
  QUOTATION_REVERT: null,
});

export default class QuotationActions {
  static changeName(name) {
    return {
      type: ACTION_TYPES.QUOTATION_CHANGE_NAME,
      payload: {
        name,
      },
    };
  }

  static selectMenu(menuId) {
    return {
      type: ACTION_TYPES.QUOTATION_SELECT_MENU,
      payload: {
        menuId,
      },
    };
  }

  static addNewMenu(menuId) {
    return {
      type: ACTION_TYPES.QUOTATION_ADD_NEW_MENU,
      payload: {
        menuId,
      },
    };
  }

  static addMenu(menu) {
    return {
      type: ACTION_TYPES.QUOTATION_ADD_MENU,
      payload: {
        menu,
      },
    };
  }

  static removeMenu(menuId) {
    return {
      type: ACTION_TYPES.QUOTATION_REMOVE_MENU,
      payload: {
        menuId,
      },
    };
  }

  static setPrice(amount) {
    return {
      type: ACTION_TYPES.QUOTATION_SET_PRICE,
      payload: {
        amount,
      },
    };
  }

  static revertQuotation(quotation) {
    return {
      type: ACTION_TYPES.QUOTATION_REVERT,
      payload: {
        data: quotation,
      },
    };
  }
}