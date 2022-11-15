import React, { useState, useEffect,useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Crearcuenta from "./components/login/Crearcuenta";
import Home from "./pages/Home";
import MostrarDulces from "./components/admin/MostrarDulces";
import { DataProvider, DataContext } from "./context/DataContext";

const mdTheme = createTheme(
  {
    palette: {
      primary: {
        light: '#ffd248',
        main: '#ffd248',
        dark: '#ffd248',
        contrastText: '#ffffff'
      },
      botones: {
        light: '#ffd248',
        main: "#6e00bd",
        contrastText: 'white'
      }
    },
  });

function App() {
  
 

  return (
    <ThemeProvider theme={mdTheme}>
      <DataProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/crear" element={<Crearcuenta />} />
          <Route exact path="/admin" element={<MostrarDulces />} />
        </Routes>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
