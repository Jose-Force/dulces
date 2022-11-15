import React, { useState, useEffect,useContext } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { DataContext } from "../../context/DataContext";
import { Button } from '@mui/material';

export default function User() {
  const settings = ['Perfil','Cerrar sesión'];
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { tokenb, setTokenb, datosUsuario } = useContext(DataContext);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const cerrarSesion=()=>{
    setAnchorElUser(null);
    setTokenb(false)
    localStorage.removeItem('token')
  }
  
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr:2 }}>
            <Avatar sx={{bgcolor:'botones.main'}}>{datosUsuario && datosUsuario.nombre[0]}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >

            <MenuItem  >
              <Button onClick={cerrarSesion}>Cerrar Sesion</Button>
            </MenuItem>

        </Menu>
      </Box>
    </>
  )
}
