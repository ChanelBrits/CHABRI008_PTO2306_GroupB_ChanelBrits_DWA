// @ts-check

import { html } from "./helpers.js";

/**
 * An object containing the color values for the day and night themes.
 */
const theme = {
  night: {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  },

  day: {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  },
};

/**
 * Applies the provided color values as the theme for the application to the
 * html.
 * @param {string} darkColor - The color value for dark elements.
 * @param {string} lightColor - The color value for light elements.
 */
const applyTheme = (darkColor, lightColor) => {
  document.documentElement.style.setProperty("--color-dark", darkColor);
  document.documentElement.style.setProperty("--color-light", lightColor);
};

// /**
//  * A function that updates the theme value in the settings form.
//  * @param {string} theme
//  */
// const updateThemeHtml = (theme) => {
//   // @ts-ignore
//   html.theme.value = theme;
// };

/**
 * A function that sets the theme based on the provided theme name.
 * @param {string} themeName
 */
export const setTheme = (themeName) => {
  const selectedTheme = theme[themeName];
  const { dark, light } = selectedTheme;

  // @ts-ignore
  html.theme.value = themeName;
  applyTheme(dark, light);
};

/**
 * A function that sets the default theme based on the user's preference.
 * @returns {string} - The default theme
 */
export const setDefaultTheme = () => {
  const darkPreference =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultTheme = darkPreference ? "night" : "day";

  setTheme(defaultTheme);

  return defaultTheme;
};
