import { Action } from "./actions.js";
import { State } from "./store.js";

/**
 * @param {State} state
 * @param {Action} action
 * @returns {State}
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        count: state.count + state.STEP_AMOUNT,
      };
    case "SUBTRACT":
      return {
        ...state,
        count: state.count - state.STEP_AMOUNT,
      };
    case "RESET":
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};
