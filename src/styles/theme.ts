export interface Theme {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  shadows: string[];  // ✅ added
}

export const lightTheme: Theme = {
  background: "#ffffff",
  surface: "#f8f9fa",
  primary: "#3b82f6",
  secondary: "#6b7280",
  text: "#1f2937",
  textSecondary: "#6b7280",
  border: "#e5e7eb",
  error: "#ef4444",
  success: "#10b981",
  shadows: [
    "none",
    "0px 1px 3px rgba(0,0,0,0.12)",
    "0px 1px 5px rgba(0,0,0,0.12)",
    "0px 3px 5px rgba(0,0,0,0.2)",
    "0px 4px 6px rgba(0,0,0,0.2)", // index 4
  ],
};

export const darkTheme: Theme = {
  background: "#121212",
  surface: "#1e1e1e",
  primary: "#2563eb",
  secondary: "#9ca3af",
  text: "#f3f4f6",
  textSecondary: "#d1d5db",
  border: "#374151",
  error: "#f87171",
  success: "#34d399",
  shadows: [
    "none",
    "0px 1px 3px rgba(0,0,0,0.3)",
    "0px 1px 5px rgba(0,0,0,0.3)",
    "0px 3px 5px rgba(0,0,0,0.4)",
    "0px 4px 6px rgba(0,0,0,0.5)", // index 4
  ],
};



export type ThemeMode = "light" | "dark" | "system";