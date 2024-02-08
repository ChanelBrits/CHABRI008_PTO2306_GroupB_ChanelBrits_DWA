// @ts-check

import { createUniqueId } from "./handlers.js";

/**
 * @typedef {Object} Employee
 * @property {string} id A unique identifier for the employee
 * @property {string} name The legal name of the employee as appearing on their ID
 * @property {Date} created The date and time the employee was created
 */

/**
 * @param {string} name The legal name of the employee as appearing on their ID
 * @param {string} company The company the employee works for
 * @return {Employee} A new employee object
 */
const createEmployee = (name, company) => {
  const id = createUniqueId();

  return {
    id,
    name,
    created: new Date(),
  };
};

const createColleague = (name) => createEmployee(name, "Codespace");
const createInspector = (name) =>
  createEmployee(name, "South African Government");

createEmployee("John Smith", "Woolworths");

createColleague("Schalk Venter");
createColleague("Ruan Smith");

createInspector("James Bond");

const createEvent = ({ attendees, title }) => {
  return {
    title,
    attendees,
    date: new Date(),
    completed: false,
  };
};

const event = createEvent({
  title: "Annual 2051 Inspection",
  attendees: [
    createColleague("Schalk Venter"),
    createColleague("Ruan Smith"),
    createInspector("Mr Big Boss"),
  ],
});
