export const html = {
  listItems: document.querySelector("[data-list-items]"),
  listButton: document.querySelector("[data-list-button]"),
  listMessage: document.querySelector("[data-list-message]"),
  searchGenres: document.querySelector("[data-search-genres]"),
  searchAuthors: document.querySelector("[data-search-authors]"),
  searchCancel: document.querySelector("[data-search-cancel]"),
  searchOverlay: document.querySelector("[data-search-overlay]"),
  searchButton: document.querySelector("[data-header-search]"),
  searchTitle: document.querySelector("[data-search-title]"),
  searchForm: document.querySelector("[data-search-form]"),
  theme: document.querySelector("[data-settings-theme]"),
  themeForm: document.querySelector("[data-settings-form]"),
  themeOverlay: document.querySelector("[data-settings-overlay]"),
  themeCancel: document.querySelector("[data-settings-cancel]"),
  themeButton: document.querySelector("[data-header-settings]"),
};

export const toggleOverlay = (overlayElement, isOpen) => {
  overlayElement.open = isOpen;
};
