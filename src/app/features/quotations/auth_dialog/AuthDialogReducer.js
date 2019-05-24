/**
 * Given the same arguments, it should calculate the next state and return it.
 * No surprises. No side effects. No API calls. No mutations. Just a calculation.
 */
import {ACTION_TYPES} from './AuthDialogActions';

export const isAuthDialogOpen = (state = false, action = {}) => {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_IS_AUTH_DIALOG_OPEN:
      return action.payload.isAuthDialogOpen;
    default:
      return state;
  }
};