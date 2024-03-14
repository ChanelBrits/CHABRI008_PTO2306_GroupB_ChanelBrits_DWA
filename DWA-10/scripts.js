const values = {
  MAX_NUMBER: 100,
  MIN_NUMBER: -100,
  STEP_AMOUNT: 1,
};

const elements = {
  total: document.querySelector("[data-total]"),
  subtract: document.querySelector("[data-subtract]"),
  add: document.querySelector("[data-add]"),
  increment: document.querySelector("[data-increment]"),
  input: document.querySelector("[data-input]"),
  closeBtn: document.querySelector("[data-close]"),
  menuBtn: document.querySelector("[data-menuBtn]"),
  menu: document.querySelector("[data-menu]"),
  reset: document.querySelector("[data-reset]"),
  overlay: document.querySelector("[data-overlay]"),
};

const handleAdd = () => {
  const newValue = parseInt(elements.total.value) + values.STEP_AMOUNT;
  elements.total.value = newValue;

  if (elements.subtract.disabled === true) {
    elements.subtract.disabled = false;
  }

  if (newValue >= values.MAX_NUMBER) {
    elements.add.disabled = true;
  }
};

const handleSubtract = () => {
  const newValue = parseInt(elements.total.value) - values.STEP_AMOUNT;
  elements.total.value = newValue;

  if (elements.add.disabled === true) {
    elements.add.disabled = false;
  }

  if (newValue <= values.MIN_NUMBER) {
    elements.subtract.disabled = true;
  }
};

const handleMenu = () => {
  if (elements.menu.style.display === "block") {
    elements.menu.style.display = "none";
  } else {
    elements.menu.style.display = "block";
  }
};

const handleReset = () => {
  const confirmation = confirm("Are you sure you want to reset the counter?");

  if (confirmation) {
    elements.total.value = 0;
    elements.add.disabled = false;
    elements.subtract.disabled = false;
    elements.menu.style.display = "none";
  } else {
    elements.menu.style.display = "none";
  }
};

const handleIncrement = () => {
  elements.overlay.style.display = "block";
  elements.menu.style.display = "none";
  console.log("hello");
};

elements.add.addEventListener("click", handleAdd);
elements.subtract.addEventListener("click", handleSubtract);
elements.menuBtn.addEventListener("click", handleMenu);
elements.reset.addEventListener("click", handleReset);
elements.increment.addEventListener("click", handleIncrement);

// elements.input.addEventListener("keyup", (event) => {
//   event.preventDefault();
//   if (event.key === "Enter") {
//     const newStep = parseInt(event.target.value);
//     if (newStep > 0) {
//       values.STEP_AMOUNT = newStep;
//       elements.input.value = "1";
//       elements.increment.style.display = "none";
//     }
//   }
// });
