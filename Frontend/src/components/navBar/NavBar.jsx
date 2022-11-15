import React, { useState, useEffect,useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Categorias from './Categorias';
import Categoriasresponsive from './Categoriasresponsive';
import User from './User';
import Sesion from '../login/Sesion';
import { DataContext } from "../../context/DataContext";

function NavBar() {

  const { tokenb, setTokenb } = useContext(DataContext);
  const pages = ['Dulces', 'Galletas', 'Snacks'];

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Categorias pages={pages} />
          <Categoriasresponsive pages={pages} />
          {tokenb ===false ?
          <Sesion/>:<User/> 
        }
        <ShoppingCartOutlinedIcon sx={{ color: "botones.main", width: 30, height: 30 }}/>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;

