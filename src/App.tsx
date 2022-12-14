import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Grid } from "@mui/material";

import "./App.css";
import Cart from "./Components/Pages/Cart";
import Home from "./Components/Pages/Home";
import ProductItem from "./Components/Pages/ProductItem";
import Products from "./Components/Pages/Products";
import Header from "./Components/StaticComponents/Header";
import SignUp from "./Components/Pages/SignUp";
import Profile from "./Components/Pages/Profile";

export const ThemeContext = createContext({ toggleMode: () => {} });

function App() {
  const [mode, setMode] = useState<"dark" | "light">("light");
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#496DDB",
            },
            secondary: {
              main: "#C95D63",
            },
            text: {
              primary: "#07393C",
              secondary: "#93827F",
            },
            background: {
              default: "#FFFFFF",
            },
          }
        : {
            primary: { main: "#BFD3C1" },
            secondary: { main: "#7e7f9a" },
            text: {
              primary: "#e8ebe4",
              secondary: "#a30b37",
            },
            background: {
              default: "#1f2421",
            },
          }),
    },
  });

  const manageTheme = {
    toggleMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  };

  return (
    <Grid item xs={12}>
      <ThemeContext.Provider value={manageTheme}>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              backgroundColor: "background.default",
              color: "text.primary",
            }}
            className="App"
          >
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="products/:id" element={<ProductItem />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signup" element={<SignUp />} />
              </Routes>
            </BrowserRouter>
          </Box>
        </ThemeProvider>
      </ThemeContext.Provider>
    </Grid>
  );
}

export default App;
