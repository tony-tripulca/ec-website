import React from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

import "@fontsource/ubuntu/400.css";
import "@fontsource/ubuntu/700.css";

import "./App.scss";

import AppRouter from "./AppRouter";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme()}>
        <AppRouter />
      </ThemeProvider>
    </BrowserRouter>
  );
}

function customTheme() {
  return createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
      },
    },
    typography: {
      fontFamily: `"Ubuntu", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
    palette: {
      primary: {
        light: grey[700],
        main: grey[900],
        dark: grey[800],
        contrastText: "white",
      },
      secondary: {
        light: grey[50],
        main: grey[100],
        dark: grey[200],
        contrastText: "black",
      },
      red: {
        light: red[700],
        main: red[900],
        dark: red[800],
        contrastText: "white",
      },
    },
  });
}
