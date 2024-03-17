import { Action } from "./actions.js";
import { reducer } from "./reducers.js";
/**
 * @typedef {Object} State
 * @prop {number} count - The current total value of the tally app
 * @prop {number} STEP_AMOUNT - The amount to increment or decrement the tally app
 */
export const State = {};

/**
 * @callback GetState
 * @returns {State}
 */

/**
 * @callback Dispatch
 * @param {Action} action
 */

/**
 * @callback Subscription
 * @param {State} prev
 * @param {State} next
 */

/**
 * @callback EmptyFn
 */

let subscribers = [];

/**
 * @type {Array<State>}
 */
const states = [
  {
    count: 0,
    STEP_AMOUNT: 1,
  },
];

/**
 * @type {GetState}
 * @returns {State}
 */
export const getState = () => {
  return { ...states[0] };
};

/**
 * @type {Dispatch}
 * @param {Action} action
 */
export const dispatch = (action) => {
  const prev = getState();
  const next = reducer(prev, action);

  subscribers.forEach((subscriber) => subscriber(prev, next));
  states.unshift(next);
};

/**
 * @param {Subscription} subscription
 * @returns {EmptyFn} Unsubscribe function
 */
export const subscribe = (subscription) => {
  subscribers.push(subscription);
  const handler = (item) => item !== subscription;

  const unsubscribe = () => {
    const newSubscribers = subscribers.filter(handler);
    subscribers = newSubscribers;
  };

  return unsubscribe;
};
