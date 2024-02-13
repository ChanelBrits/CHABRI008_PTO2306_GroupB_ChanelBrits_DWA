const createOption = (value, text) => {
  const optionElement = document.createElement("option");
  optionElement.value = value;
  optionElement.innerText = text;

  return optionElement;
};

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

const filterByGenre = (book, genreFilter) => {
  return genreFilter === "any" || book.genres.includes(genreFilter);
};

const filterByAuthor = (book, authorFilter) => {
  return authorFilter === "any" || book.author === authorFilter;
};

const filterByTitle = (book, titleFilter) => {
  return (
    titleFilter.trim() === "" ||
    book.title.toLowerCase().includes(titleFilter.toLowerCase())
  );
};

export const filterBooks = (books, filters) => {
  const { genre, author, title } = filters;
  return books.filter((book) => {
    const genreMatch = filterByGenre(book, genre);
    const authorMatch = filterByAuthor(book, author);
    const titleMatch = filterByTitle(book, title);

    return genreMatch && titleMatch && authorMatch;
  });
};
