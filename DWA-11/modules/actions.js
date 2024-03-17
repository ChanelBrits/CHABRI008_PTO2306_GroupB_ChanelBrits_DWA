/**
 * @typedef {object} Add
 * @prop {'ADD'} type
 */

/**
 * @typedef {object} Subtract
 * @prop {'SUBTRACT'} type
 */

/**
 * @typedef {object} Reset
 * @prop {'RESET'} type
 */

/**
 * @typedef {Add | Subtract | Reset} Action
 */
export const Action = {};

/**
 * @returns {Add}
 */
export const add = () => ({ type: "ADD" });

/**
 * @returns {Subtract}
 */
export const subtract = () => ({ type: "SUBTRACT" });

/**
 * @returns {Reset}
 */
export const reset = () => ({ type: "RESET" });
