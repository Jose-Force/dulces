import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';
import Button from '@mui/material/Button';
import logo from '../../img/logo.png'
import { DataContext } from "../../context/DataContext";

export default function Categorias({ pages }) {

  const { datosUsuario } = useContext(DataContext);

  return (
    <>
      <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
        <Link href='/'>
          <img src={logo} width='60px' />
        </Link>

      </Box>

      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map((page) => (
          <Button
            variant="contained"
            color="botones"
            key={page}
            /* onClick={handleCloseNavMenu} */
            sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}
          >
            {page}
          </Button>
        ))}

      </Box>
      {(datosUsuario !== undefined && datosUsuario.admin === true) ? <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Link underline="none" href='/admin'>
          <Button
            variant="contained"
            color="botones"
            sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}
            onClick={() => true}
          >

            Administrar productos
          </Button>
        </Link>
      </Box>
        :
        null}
    </>
  )
}
