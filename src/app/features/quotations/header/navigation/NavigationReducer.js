/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import {ACTION_TYPES} from './NavigationActions';

const backLink = (state = '', action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_NAVIGATION:
      return action.payload.backLink;
    default:
      return state;
  }
};

const title = (state = '', action) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_NAVIGATION:
      return action.payload.title;
    default:
      return state;
  }
};

const closeDialog = (state = null, action) => {
  switch (action.type) {
    case ACTION_TYPES.CLOSE_NAVIGATION_DIALOG:
      return action.payload.closeDialog;
    case ACTION_TYPES.CHANGE_NAVIGATION:
      return null;
    default:
      return state;
  }
};

export default (state = {}, action = {}) => {
  return {
    backLink: backLink(state.backLink, action),
    title: title(state.title, action),
    closeDialog: closeDialog(state.closeDialog, action),
  };
};