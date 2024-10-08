import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { themeSettings } from "./providers/ThemeProvider";
import MyRoutes from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./store";
import { getProfileInfo } from "@/features/Auth/store/actions";

export const App = () => {
  const theme = useMemo(
    () => createTheme(themeSettings("dark") as ThemeOptions),
    ["dark"]
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfileInfo()); // получаем информацию о юзере
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyRoutes />
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};
