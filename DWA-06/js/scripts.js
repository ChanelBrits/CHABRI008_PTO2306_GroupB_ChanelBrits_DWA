import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { html, toggleOverlay } from "./helpers.js";
import {
  loadPreviews,
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

updateShowMoreButton(page, matches);
loadPreviews(matches);
setDefaultTheme();

html.searchGenres.appendChild(createSelectElement(genres, "any", "All Genres"));
html.searchAuthors.appendChild(
  createSelectElement(authors, "any", "All Authors")
);

const handleShowMoreBtn = () => {
  page++;
  const startIndexOfBooks = (page - 1) * BOOKS_PER_PAGE;
  const endIndexOfBooks = page * BOOKS_PER_PAGE;

  const booksToDisplay = matches.slice(startIndexOfBooks, endIndexOfBooks);

  loadPreviews(booksToDisplay);

  updateShowMoreButton(page, matches);
};

const handleSettingsButton = () => {
  toggleOverlay(html.themeOverlay, true);
};

const handleSettingsSave = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  setTheme(theme);

  toggleOverlay(html.themeOverlay, false);
};

const handleSettingsCancel = (event) => {
  event.preventDefault();

  toggleOverlay(html.themeOverlay, false);
};

const handleSearchSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  console.log(filters);

  let result = [];
  result.push(...filterBooks(books, filters));
  console.log(result);

  page = 1;
  matches = result;

  html.listMessage.classList.toggle("list__message_show", result.length < 1);
  html.listItems.innerHTML = "";

  loadPreviews(result);
  updateShowMoreButton(page, result);
  toggleOverlay(html.searchOverlay, false);

  window.scrollTo({ top: 0, behavior: "smooth" });

  event.target.reset();
};

const handleSearchButton = () => {
  toggleOverlay(html.searchOverlay, true);
  html.searchTitle.focus();
};

const handleSearchCancel = (event) => {
  event.preventDefault();

  toggleOverlay(html.searchOverlay, false);
};

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
