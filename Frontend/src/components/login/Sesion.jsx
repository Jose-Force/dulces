import React, { useState, useEffect, useContext } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Grid, Box, TextField, Button, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Drawer, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom"
import APIInvoke from '../../utils/APPInvoke';
import swal from 'sweetalert';
import { DataContext } from "../../context/DataContext";

export default function Sesion() {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { tokenb, setTokenb, cargarUsuarios } = useContext(DataContext);

  const [usuario, setUsuario] = useState({
    email: '',
    password: '',
  });

  const { email, password } = usuario

  const iniciar = async () => {

    if (password.length < 6) {
      swal(
        {
          title: "La contraseña debe ser al menos de 6 caracteres",
          icon: "error",
          dangerMode: true,
        }
      )
    } else {
      const data = {
        email: email,
        password: password
      }
      const response = await APIInvoke.invokePOST(`/api/auth`, data)
      const mensaje = response.msg //El usuario no existe
      if (mensaje === 'El usuario no existe' || mensaje === 'Contraseña incorrecta') {
        swal(
          {
            title: "No es posible iniciar sesión verifique los datos ingresados",
            icon: "error",
            dangerMode: true,
          }
        )
      } else {
        //Obtenemos el token
        const jwt = response.token
        //Guardamos el token con localstorage
        localStorage.setItem('token', jwt)
        cargarUsuarios()
        //redireccionamos al home
        setDrawerOpen(false)
        setUsuario({
          email: '',
          password: '',
        })
      }
    }
  }

  const onChange = (event) => {
    setUsuario({
      ...usuario,
      [event.target.name]: event.target.value
    })
  }
  
  const onSubmit = (event) => {
    event.preventDefault()
    iniciar()
  }

  return (
    <>
      <IconButton sx={{ mr: 2 }} onClick={() => setDrawerOpen(true)}>
        <AccountCircle sx={{ color: "botones.main", width: 30, height: 30 }} />
      </IconButton>
      <Drawer anchor='right'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Grid sx={{ m: 5, mb: 0 }}>
          <Grid align="center">
            <AccountCircle sx={{ color: "botones.main", width: 50, height: 50 }} />
            <form onSubmit={onSubmit}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField type="email"
                  variant="standard"
                  id="email"
                  name="email"
                  label="Email"
                  value={email}
                  required
                  onChange={onChange} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
                <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField type="password"
                  variant="standard"
                  id="password"
                  name="password"
                  label="Contraseña"
                  value={password}
                  required
                  onChange={onChange} />
              </Box>

              <div>
                <Button variant="contained" color="primary" sx={{ my: 1 }} type="submit" /* onSubmit={onSubmit} */>Iniciar Sesión</Button>
              </div>

            </form>
          </Grid>
        </Grid>

        <Grid sx={{ m: 5 }}>
          <Grid align="center">
            <Box>
              ¿No tienes cuenta aún?
            </Box>
            <Link variant='button' sx={{ my: 1, color: "botones.main", }} href="/crear" underline="none">Crear cuenta</Link>
          </Grid>
        </Grid>

      </Drawer>
    </>
  )
}




