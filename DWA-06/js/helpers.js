// @ts-check

/**
 * @typedef {object} BookPreview - An object representing a book to be shown to a user
 * @prop {string} author - The author ID that corresponds to the authors object
 * @prop {string} id - The unique book ID
 * @prop {string} image - The URL of the associated book cover
 * @prop {string} title - The title of the book
 */

/**
 * @typedef {Object} Book - An object containing all the data of a book
 * @prop {string} id - The unique book ID
 * @prop {string[]} genres - The genre ID that corresponds to the genres object
 * @prop {number} popularity - The popularity of the book represented as a number
 * @prop {string} title - The title of the book as published
 * @prop {string} image - The URL of the associated book cover
 * @prop {string} description - A short description of the book
 * @prop {number} pages - The number of pages in the book
 * @prop {string} published - The date the book was published
 * @prop {string} author - The author ID that corresponds to the authors object
 */

export const BookPreview = {};
export const Book = {};

/**
 * Helper function to find and validate an HTML element.
 * @param {string} selector - The element selector for the element.
 * @returns {HTMLElement} - The validated HTML element.
 * @throws {Error} - If the element is not found or not an HTML element.
 */
const getValidatedElement = (selector) => {
  const element = document.querySelector(selector);

  if (!element || !(element instanceof HTMLElement)) {
    throw new Error(`Invalid HTML element: ${element}`);
  }

  return element;
};

export const html = {
  listItems: getValidatedElement("[data-list-items]"),
  listButton: getValidatedElement("[data-list-button]"),
  listMessage: getValidatedElement("[data-list-message]"),
  listTitle: getValidatedElement("[data-list-title]"),
  listSubtitle: getValidatedElement("[data-list-subtitle]"),
  listDescription: getValidatedElement("[data-list-description]"),
  listBlur: getValidatedElement("[data-list-blur]"),
  listImage: getValidatedElement("[data-list-image]"),
  listActive: getValidatedElement("[data-list-active]"),

  searchGenres: getValidatedElement("[data-search-genres]"),
  searchAuthors: getValidatedElement("[data-search-authors]"),
  searchCancel: getValidatedElement("[data-search-cancel]"),
  searchOverlay: getValidatedElement("[data-search-overlay]"),
  searchButton: getValidatedElement("[data-header-search]"),
  searchTitle: getValidatedElement("[data-search-title]"),
  searchForm: getValidatedElement("[data-search-form]"),

  theme: getValidatedElement("[data-settings-theme]"),
  themeForm: getValidatedElement("[data-settings-form]"),
  themeOverlay: getValidatedElement("[data-settings-overlay]"),
  themeCancel: getValidatedElement("[data-settings-cancel]"),
  themeButton: getValidatedElement("[data-header-settings]"),
};

export const toggleOverlay = (overlayElement, isOpen) => {
  overlayElement.open = isOpen;
};
