// @ts-check

import { Book } from "./helpers.js";

/**
 * Creates an option element based on the provided value and
 * text.
 * @param {string} value
 * @param {string} text
 * @returns {HTMLElement}
 */
const createOption = (value, text) => {
  const optionElement = document.createElement("option");
  optionElement.value = value;
  optionElement.innerText = text;

  return optionElement;
};

/**
 * A function that creates a select element by iterating through the provided
 * data and creating an option element for each entry by using the
 * {@link createOption} function. It also sets the default value and text for
 * the select element.
 * @param {object} data - The data to be used to create the select element
 * @param {string} defaultValue - The default value for the select element
 * @param {string} defaultText - The default text for the select element
 * @returns {DocumentFragment} - A fragment containing the select element
 */
export const createSelectElement = (data, defaultValue, defaultText) => {
  const selectFragment = document.createDocumentFragment();
  const defaultOption = createOption(defaultValue, defaultText);
  selectFragment.appendChild(defaultOption);

  for (const [value, text] of Object.entries(data)) {
    const option = createOption(value, text);
    selectFragment.appendChild(option);
  }

  return selectFragment;
};

/**
 * @param {Book} book - The book to be filtered based on the genre data
 * @param {object} genreFilter
 * @returns {boolean} - Whether the book matches the genre filter
 */
const filterByGenre = (book, genreFilter) => {
  return genreFilter === "any" || book.genres.includes(genreFilter);
};

/**
 * @param {Book} book - The book to be filtered based on the author data
 * @param {object} authorFilter
 * @returns {boolean} - Whether the book matches the author filter
 */
const filterByAuthor = (book, authorFilter) => {
  return authorFilter === "any" || book.author === authorFilter;
};

/**
 * @param {Book} book - The book to be filtered based on the title data
 * @param {object} titleFilter
 * @returns {boolean} - Whether the book matches the title filter
 */
const filterByTitle = (book, titleFilter) => {
  return (
    titleFilter.trim() === "" ||
    book.title.toLowerCase().includes(titleFilter.toLowerCase())
  );
};

/**
 * @param {Book[]} books - The books to be filtered
 * @param {object} filters - The filters to be used to filter the books
 * @returns {Book[]} - The books that match the provided filters
 */
export const filterBooks = (books, filters) => {
  const { genre, author, title } = filters;
  return books.filter((book) => {
    const genreMatch = filterByGenre(book, genre);
    const authorMatch = filterByAuthor(book, author);
    const titleMatch = filterByTitle(book, title);

    return genreMatch && titleMatch && authorMatch;
  });
};
