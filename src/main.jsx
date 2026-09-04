import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import App from "./App.jsx";
import "./index.css";

import {
  LanguageProvider,
} from "./context/LanguageContext.jsx";

import {
  ThemeProvider,
} from "./context/ThemeContext.jsx";

import ThemeSwitcher from "./components/ThemeSwitcher.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <App />
          <ThemeSwitcher />
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);
