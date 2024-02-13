import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { html, toggleOverlay } from "./helpers.js";
import {
  loadPreviews,
  createPreviewHTML,
  updateShowMoreButton,
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

const handleSearchButton = () => {
  toggleOverlay(html.searchOverlay, true);
  html.searchTitle.focus();
};

const handleSearchCancel = (event) => {
  event.preventDefault();

  toggleOverlay(html.searchOverlay, false);
};

html.listButton.addEventListener("click", handleShowMoreBtn);

html.themeForm.addEventListener("submit", handleSettingsSave);
html.themeCancel.addEventListener("click", handleSettingsCancel);
html.themeButton.addEventListener("click", handleSettingsButton);

html.searchButton.addEventListener("click", handleSearchButton);
html.searchCancel.addEventListener("click", handleSearchCancel);

document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});

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

html.searchForm.addEventListener("submit", handleSearchSubmit);

document
  .querySelector("[data-list-items]")
  .addEventListener("click", (event) => {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;

    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        let result = null;

        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }

        active = result;
      }
    }

    if (active) {
      document.querySelector("[data-list-active]").open = true;
      document.querySelector("[data-list-blur]").src = active.image;
      document.querySelector("[data-list-image]").src = active.image;
      document.querySelector("[data-list-title]").innerText = active.title;
      document.querySelector("[data-list-subtitle]").innerText = `${
        authors[active.author]
      } (${new Date(active.published).getFullYear()})`;
      document.querySelector("[data-list-description]").innerText =
        active.description;
    }
  });
