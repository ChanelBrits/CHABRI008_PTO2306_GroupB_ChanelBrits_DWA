// @ts-check

import { books, authors, BOOKS_PER_PAGE } from "./data.js";
import { html, Book } from "./helpers.js";

/**
 * Creates a button element for the book preview and sets up the inner HTML
 * @param {Pick<Book, 'author' | 'id' | 'image' | 'title'>} book - The book data to be used to create the preview
 * @returns {HTMLElement} - A button element that represents a book preview
 */
export const createPreviewElement = ({ author, id, image, title }) => {
  const previewElement = document.createElement("button");
  previewElement.classList.add("preview");
  previewElement.setAttribute("data-preview", id);

  previewElement.innerHTML = `
      <img
          class="preview__image"
          src="${image}"
      />
      
      <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
      </div>
    `;

  return previewElement;
};

/**
 * A function that iterates through the selected books and creates a preview
 * element for each one using the {@link createPreviewElement} function
 * @param {Book[]} books - The books to be used to create the previews
 * @returns {DocumentFragment} - fragment containing the preview elements
 */
export const createPreviewHTML = (books) => {
  const previewFragment = document.createDocumentFragment();
  const extractedBooks = books.slice(0, BOOKS_PER_PAGE);

  for (const book of extractedBooks) {
    const previewElement = createPreviewElement(book);
    previewFragment.appendChild(previewElement);
  }

  return previewFragment;
};

/**
 * A function that creates a preview of each book using
 * {@link createPreviewHTML} and then appends the previews to the list items
 * @param {Book[]} books - The books to be used to create the previews
 */
export const loadPreviews = (books) => {
  const previewFragment = createPreviewHTML(books);
  html.listItems.appendChild(previewFragment);
};

/**
 * Calculates the number of books to display
 * @param {number} page - The current page number for displaying books
 * @param {object} matches - The books that match the search criteria
 * @param {number} BOOKS_PER_PAGE - How many books to display per page
 * @returns {number} - The number of books remaining to display
 */
const calculateRemainingBooks = (page, matches, BOOKS_PER_PAGE) => {
  const startIndexOfBooks = page * BOOKS_PER_PAGE;
  const remainingBooks = matches.length - startIndexOfBooks;

  return remainingBooks > 0 ? remainingBooks : 0;
};

/**
 * A function that updates the show more button in the html to display the
 * number of remaining books using the {@link calculateRemainingBooks} function
 * @param {number} page - The current page number for displaying books
 * @param {object} matches - The books that match the search criteria
 */
export const updateShowMoreButton = (page, matches) => {
  const remainingBooks = calculateRemainingBooks(page, matches, BOOKS_PER_PAGE);

  html.listButton.innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${remainingBooks})</span>
  `;
};

/**
 * Finds the active book ID from the event path or composed path.
 * @param {Event} event - The event object representing the user action.
 * @returns {string | null} The ID of the active book if found, otherwise null.
 */
export const getActiveBook = (event) => {
  //@ts-ignore
  const pathArray = Array.from(event.path || event.composedPath());
  const previewNode = pathArray.find((node) => node?.dataset?.preview);

  return previewNode ? previewNode.dataset.preview : null;
};

/**
 *  A function that finds the book based on its ID
 * @param {string} bookId - The unique book ID
 * @returns {Book | undefined } - The book object that matches the ID
 */
export const findBookById = (bookId) => {
  return books.find((book) => book.id === bookId);
};

/**
 * A function that updates the book image in the html based on the provided
 * image source
 * @param {string} imageSrc
 */
export const updateBookImage = (imageSrc) => {
  // @ts-ignore
  html.listBlur.src = imageSrc;
  // @ts-ignore
  html.listImage.src = imageSrc;
};

/**
 * A function that displays more detailed information about the book when the
 * preview button is clicked
 * @param {Pick<Book, 'title' | 'author' | 'published' | 'description'>} book -
 * The book object used to show more detailed preview information
 */
export const updateBookInfo = ({ title, author, published, description }) => {
  const publicationYear = new Date(published).getFullYear();
  const authorName = authors[author];

  html.listTitle.innerText = title;
  html.listSubtitle.innerText = `${authorName} (${publicationYear})`;
  html.listDescription.innerText = description;
};
