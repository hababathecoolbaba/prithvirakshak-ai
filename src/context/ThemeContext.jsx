import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext = createContext(null);

export const themes = [
  { id: "light", name: "Light" },
  { id: "dark", name: "Dark" },
  { id: "ocean", name: "Ocean" },
  { id: "forest", name: "Forest" },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem("prithvirakshak-theme") ||
      "light"
    );
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    localStorage.setItem(
      "prithvirakshak-theme",
      theme
    );
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      themes,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}
