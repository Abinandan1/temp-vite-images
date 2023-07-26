import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark)"
  ).matches;
  const storedDarkTheme = localStorage.getItem("dark-theme") === "true";
  return storedDarkTheme || prefersDarkMode;
};

export const useGlobalContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState("dog");
  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("dark-theme", newDarkTheme);
  };
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);
  return (
    <AppContext.Provider
      value={{ searchTerm, setSearchTerm, isDarkTheme, toggleDarkTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
