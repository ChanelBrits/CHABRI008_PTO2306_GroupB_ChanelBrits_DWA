const provinces = [
  "Western Cape",
  "Gauteng",
  "Northern Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
];
const names = [
  "Ashwin",
  "Sibongile",
  "Jan-Hendrik",
  "Sifso",
  "Shailen",
  "Frikkie",
];

/**
 * Use forEach to console log each name to the console. You are allowed to call console.log seven times.
 * Use forEach to console log each name with a matching province (for example Ashwin (Western Cape).
 * Using map loop over all province names and turn the string to all uppercase. Log the new array to the console.
 * Create a new array with map that has the amount of characters in each name. The result should be: [6, 9, 11, 5, 7, 7]
 * Using toSorted to sort all provinces alphabetically.
 * Use filter to remove all provinces that have the word Cape in them. After filtering the array, return the amount of provinces left. The final value should be 3
 * Create a boolean array by using map and some to determine whether a name contains an S character. The result should be [true, true, false, true, true, false]
 */

names.forEach((name) => console.log(`Exercise 1: ${name}`)); //Console log 1
names.forEach(
  (name, index) => console.log(`Exercise 2: ${name} (${provinces[index]})`) //Console log 2
);
const uppercaseProvinces = provinces.map((province) => province.toUpperCase());
console.log(`Exercise 3:`, uppercaseProvinces); //Console log 3

const nameLengths = names.map((name) => name.length);
console.log(`Exercise 4:`, nameLengths); //Console log 4

const sortedProvinces = provinces.toSorted();
console.log(`Exercise 5:`, sortedProvinces); //Console log 5

const filteredProvinces = provinces.filter(
  (province) => !province.includes("Cape")
);
console.log(`Exercise 6:`, filteredProvinces.length); //Console log 6

const namesWithS = names.map(
  (name) => name.includes("s") || name.includes("S")
);
console.log(`Exercise 7:`, namesWithS); //Console log 7

//Additional exercises

const products = [
  { product: "banana", price: "2" },
  { product: "mango", price: 6 },
  { product: "potato", price: " " },
  { product: "avocado", price: "8" },
  { product: "coffee", price: 10 },
  { product: "tea", price: "" },
];

/**
 * Wrapped in a single Console Log
 * Exercise 1: Use forEach to console.log each product name to the console.
 * Exercise 2: Use filter to filter out products that have a name longer than 5 characters
 * Exercise 3: Using both filter and map. Convert all prices that are strings to numbers, and remove all products from the array that do not have prices. After this has been done then use reduce to calculate the combined price of all remaining products.
 * Exercise 4: Use reduce to concatenate all product names to create the following string: banana, mango, potato, avocado, coffee and tea.
 * Exercise 5: Use reduce to calculate both the highest and lowest-priced items. The names should be returned as the following string: Highest: coffee. Lowest: banana.
 * Exercise 6: Using only Object.entries and reduce recreate the object with the exact same values. However, the following object keys should be changed in the new array:product should be changed to name price should be changed to cost
 */

console.log(
  //Exercise 1
  products.forEach((item) => console.log(`Exercise 1: ${item.product}`)),

  //Exercise 2
  (() => {
    const filteredProducts = products.filter(
      (item) => item.product.length <= 5
    );
    filteredProducts.forEach((item) =>
      console.log(`Exercise 2: ${item.product}`)
    );
    return filteredProducts;
  })(),

  "Exercise 3:",
  (() => {
    const combinedPrice = products
      .filter((item) => !isNaN(item.price) && item.price !== "")
      .map((item) => Number(item.price))
      .reduce((acc, price) => acc + price, 0);
    return combinedPrice;
  })(),

  "Exercise 4:",
  products.reduce(
    (acc, item) => (acc === "" ? item.product : acc + ", " + item.product),
    ""
  ),

  "Exercise 5:",
  (() => {
    const { highest, lowest } = products.reduce(
      (acc, item) => {
        if (!acc.highest || item.price > acc.highest.price) {
          acc.highest = item;
        }
        if (!acc.lowest || item.price < acc.lowest.price) {
          acc.lowest = item;
        }
        return acc;
      },
      { highest: null, lowest: null }
    );
    return `Highest: ${highest.product}. Lowest: ${lowest.product}`;
  })(),

  "Exercise 6:",
  products.reduce((acc, item) => {
    const convertedEntry = Object.entries(item).reduce((obj, [key, value]) => {
      const newKey = key === "product" ? "name" : "cost";

      obj[newKey] = value;
      return obj;
    }, {});

    acc.push(convertedEntry);
    return acc;
  }, [])
);
