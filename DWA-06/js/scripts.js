import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { html, toggleOverlay } from "./helpers.js";
import {
  loadPreviews,
  calculateRemainingBooks,
  updateShowMoreButton,
  getActiveBook,
  findBookById,
  updateBookImage,
  updateBookInfo,
} from "./previews.js";
import { createSelectElement, filterBooks } from "./search.js";
import { setDefaultTheme, setTheme } from "./settings.js";

let page = 1;
let matches = books;

const staringBooks = calculateRemainingBooks(matches.length, page);
updateShowMoreButton(staringBooks);
loadPreviews(matches);
setDefaultTheme();

html.searchGenres.appendChild(createSelectElement(genres, "any", "All Genres"));
html.searchAuthors.appendChild(
  createSelectElement(authors, "any", "All Authors")
);

/**
 * a Handler that increases the current page number, loads the next set of
 * books, and updates the "Show more" button to display the remaining books
 * available .
 */
const handleShowMoreBtn = () => {
  page++;
  const startIndexOfBooks = (page - 1) * BOOKS_PER_PAGE;
  const endIndexOfBooks = page * BOOKS_PER_PAGE;

  const booksToDisplay = matches.slice(startIndexOfBooks, endIndexOfBooks);

  loadPreviews(booksToDisplay);

  const remainingBooks = calculateRemainingBooks(
    matches.length,
    endIndexOfBooks
  );

  updateShowMoreButton(remainingBooks);
};

/**
 * a Handler that opens the settings overlay when the settings button is
 * clicked.
 */
const handleSettingsButton = () => {
  toggleOverlay(html.themeOverlay, true);
};

/**
 * a Handler that saves and applies the selected theme and closes the settings
 * overlay
 * @param {Event} event - The form submit event
 */
const handleSettingsSave = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  setTheme(theme);

  toggleOverlay(html.themeOverlay, false);
};

/**
 * a Handler that closes the settings overlay when the cancel button is clicked
 * @param {Event} event
 */
const handleSettingsCancel = (event) => {
  event.preventDefault();

  toggleOverlay(html.themeOverlay, false);
};

/**
 * a Handler that fires when the search form is submitted. It takes the
 * submitted values and filters the books based on the search criteria. It then
 * displays the matching list of books and the "Show more" button to display the remaining
 * books available. If no books match the search criteria, a message is displayed.
 * @param {Event} event
 */
const handleSearchSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);

  let result = [];
  result.push(...filterBooks(books, filters));

  page = 1;
  matches = result;

  html.listMessage.classList.toggle("list__message_show", result.length < 1);
  html.listItems.innerHTML = "";

  loadPreviews(result);
  const remainingBooks = calculateRemainingBooks(result.length, 0);
  updateShowMoreButton(remainingBooks);
  toggleOverlay(html.searchOverlay, false);

  window.scrollTo({ top: 0, behavior: "smooth" });

  event.target.reset();
};

/**
 * a Handler that opens the search overlay when the search button is clicked.
 */
const handleSearchButton = () => {
  toggleOverlay(html.searchOverlay, true);
  html.searchTitle.focus();
};

const handleSearchCancel = (event) => {
  event.preventDefault();

  toggleOverlay(html.searchOverlay, false);
};

/**
 * a Handler that retrieves the active book ID from the event path and displays
 * a more detailed preview of the book.
 * @param {Event} event
 */
const handlePreviewClick = (event) => {
  const bookId = getActiveBook(event);

  if (bookId) {
    const activeBook = findBookById(bookId);

    if (activeBook) {
      toggleOverlay(html.listActive, true);
      updateBookImage(activeBook.image);
      updateBookInfo(activeBook);
    }
  }
};

/**
 * a Handler that closes the detailed preview of the book.
 */
const handlePreviewClose = () => {
  toggleOverlay(html.listActive, false);
};

html.listButton.addEventListener("click", handleShowMoreBtn);
html.listActive.addEventListener("click", handlePreviewClose);
html.listItems.addEventListener("click", handlePreviewClick);

html.themeForm.addEventListener("submit", handleSettingsSave);
html.themeCancel.addEventListener("click", handleSettingsCancel);
html.themeButton.addEventListener("click", handleSettingsButton);

html.searchButton.addEventListener("click", handleSearchButton);
html.searchCancel.addEventListener("click", handleSearchCancel);
html.searchForm.addEventListener("submit", handleSearchSubmit);
