import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";
import { html } from "./helpers.js";

export const createPreviewElement = ({ author, id, image, title }) => {
  const previewElement = document.createElement("button");
  previewElement.classList = "preview";
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

export const createPreviewHTML = (books) => {
  const previewFragment = document.createDocumentFragment();
  const extractedBooks = books.slice(0, BOOKS_PER_PAGE);

  for (const book of extractedBooks) {
    const previewElement = createPreviewElement(book);
    previewFragment.appendChild(previewElement);
  }

  return previewFragment;
};

export const loadPreviews = (books) => {
  const previewFragment = createPreviewHTML(books);
  html.listItems.appendChild(previewFragment);
};

const calculateRemainingBooks = (page, matches, BOOKS_PER_PAGE) => {
  const startIndexOfBooks = page * BOOKS_PER_PAGE;
  const remainingBooks = matches.length - startIndexOfBooks;

  return remainingBooks > 0 ? remainingBooks : 0;
};

export const updateShowMoreButton = (page, matches) => {
  const remainingBooks = calculateRemainingBooks(page, matches, BOOKS_PER_PAGE);

  html.listButton.innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${remainingBooks})</span>
  `;
};
