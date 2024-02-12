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
