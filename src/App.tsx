import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/auth/RequireAuth";

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#00577E",
      light: "#00B5B8",
      dark: "#00415F",
      contrastText: "#fff",
    },
    secondary: {
      main: "#00CCC6",
      light: "#4DFFF9",
      dark: "#009A95",
      contrastText: "#fff",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h6: {
      fontSize: "1.15rem",
    },
    subtitle1: {
      fontSize: "0.95rem",
    },
    body1: {
      fontSize: "0.9rem",
    },
    body2: {
      fontSize: "0.85rem",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          boxShadow: "none",
        },
        containedPrimary: {
          background: "linear-gradient(90deg, #00577E 0%, #066989 100%)",
          "&:hover": {
            background: "linear-gradient(90deg, #00415F 0%, #055F7F 100%)",
            boxShadow: "0px 4px 8px rgba(0, 87, 126, 0.3)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(90deg, #00CCC6 0%, #4DFFF9 100%)",
          "&:hover": {
            background: "linear-gradient(90deg, #00B5B0 0%, #3AEBE5 100%)",
            boxShadow: "0px 4px 8px rgba(0, 204, 198, 0.3)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
