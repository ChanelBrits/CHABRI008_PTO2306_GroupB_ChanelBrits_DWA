import { html } from "./helpers.js";

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

const applyTheme = (darkColor, lightColor) => {
  document.documentElement.style.setProperty("--color-dark", darkColor);
  document.documentElement.style.setProperty("--color-light", lightColor);
};

const updateThemeHtml = (theme) => {
  html.theme.value = theme;
};

export const setTheme = (themeName) => {
  const selectedTheme = theme[themeName];
  const { dark, light } = selectedTheme;

  updateThemeHtml(themeName);
  applyTheme(dark, light);
};

export const setDefaultTheme = () => {
  const darkPreference =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const defaultTheme = darkPreference ? "night" : "day";

  setTheme(defaultTheme);

  return defaultTheme;
};
