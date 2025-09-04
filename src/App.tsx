import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/ThemeContext";
import { useTheme } from "./context/ThemeContext";
import { store } from "./redux/store";
import ErrorBoundary from "./components/layout/ErrorBoundary/ErrorBoundary";
import Header from "./components/layout/Header/Header";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Favorites from "./pages/Favorites/Favorites";
import NotFound from "./pages/NotFound/NotFound";
import { GlobalStyle } from "./styles/GlobalStyle";
import { CssBaseline, ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material';
import { darkTheme } from "./styles/theme";
import "./styles/tailwind.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Create a wrapper component to handle MUI theme
const MuiThemeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  
  const muiTheme = createTheme({
    palette: {
      mode: theme.background === darkTheme.background ? 'dark' : 'light',
      primary: {
        main: theme.primary,
      },
      background: {
        default: theme.background,
        paper: theme.surface,
      },
      text: {
        primary: theme.text,
        secondary: theme.textSecondary,
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: theme.surface,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: theme.surface,
            color: theme.text,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.border,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.primary,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.primary,
            },
          },
          input: {
            color: theme.text,
          },
        },
      },
    },
  });

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <GlobalStyle theme={theme} />
      {children}
    </MuiThemeProvider>
  );
};

function AppContent() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Router>
              <MuiThemeWrapper>
                <AppContent />
              </MuiThemeWrapper>
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;