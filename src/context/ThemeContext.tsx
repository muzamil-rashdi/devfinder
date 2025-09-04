import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Theme, ThemeMode, lightTheme, darkTheme } from "../styles/theme";

interface ThemeContextType {
  theme: Theme;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "system";
    
    const saved = localStorage.getItem("themeMode");
    return (saved as ThemeMode) || "system";
  });

  const getSystemTheme = useCallback((): Theme => {
    if (typeof window === "undefined") return lightTheme;
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? darkTheme
      : lightTheme;
  }, []);

  const getTheme = useCallback((): Theme => {
    if (themeMode === "system") return getSystemTheme();
    return themeMode === "dark" ? darkTheme : lightTheme;
  }, [themeMode, getSystemTheme]);

  const [theme, setTheme] = useState<Theme>(getTheme());

  // Update theme and document class when themeMode changes
  useEffect(() => {
    localStorage.setItem("themeMode", themeMode);
    const newTheme = getTheme();
    setTheme(newTheme);
    
    // Add or remove dark class from document
    const isDark = themeMode === "dark" || 
                  (themeMode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode, getTheme]);

  // Listen for system theme changes when in system mode
  useEffect(() => {
    if (themeMode !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const newTheme = getTheme();
      setTheme(newTheme);
      
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    };

    // Set initial class based on system preference
    if (themeMode === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
      }
    }

    // Add event listener for system theme changes
    mediaQuery.addEventListener("change", handleChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [themeMode, getTheme]);

  const toggleTheme = () => {
    setThemeMode(prev => (prev === "dark" ? "light" : "dark"));
  };

  const value: ThemeContextType = {
    theme,
    themeMode,
    setThemeMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};