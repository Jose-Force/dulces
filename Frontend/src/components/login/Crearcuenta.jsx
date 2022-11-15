import React, { useState, useEffect } from 'react';
import { Avatar, Grid, Paper, Box, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Link from '@mui/material/Link';
import APIInvoke from '../../utils/APPInvoke';
import swal from 'sweetalert';

export default function Crearcuenta() {

  const paperStyle = { padding: 20, height: '400px', width: 280, margin: "50px auto" }
  const avatarStyle = { backgroundColor: '#ffd248' }

  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  });

  const { nombre, email, password, confirmar } = usuario

  
  //Validaciones para crear cuenta
  const crear = async () => {

    if (password !== confirmar) {
      swal(
        {
          title: "Error",
          text: "Las contraseñas son diferentes",
          icon: "error",
          dangerMode: true,
        }
      )
    } else if (password.length < 6) {
      swal(
        {
          title: "La contraseña debe ser al menos de 6 caracteres",
          icon: "error",
          dangerMode: true,
        }
      )
    } else {
      const data = {
        nombre: nombre,
        email: email,
        password: password
      }
      const response = await APIInvoke.invokePOST(`/api/usuarios`, data)
      const mensaje = response.msg
  
      if (mensaje === "El usuario ya existe") {
        swal(
          {
            title: "El correo electrónico ingresado ya se encuentra registrado",
            icon: "error",
            dangerMode: true,
          }
        )
      } else {
        swal(
          {
            title: "El usuario fue creado correctamente",
            icon: "success",
            dangerMode: true,
            className: "primary"
          }
        )
        setUsuario({
          nombre: '',
          email: '',
          password: '',
          confirmar: ''
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
    crear()
  }

  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h3 style={{ margin: "3px" }}>Crear cuenta</h3>

          <form onSubmit={onSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField type="text"
                variant="standard"
                id="nombre"
                name="nombre"
                label="Nombre"
                value={nombre}
                required
                onChange={onChange} />
            </Box>

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

            <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField type="password"
                variant="standard"
                id="confirmar"
                name="confirmar"
                label="Confirmar contraseña"
                value={confirmar}
                required
                onChange={onChange} />
            </Box>

            <div>
              <Button variant="contained" color="primary" sx={{ my: 1 }} type="submit" onSubmit={onSubmit}>Crear cuenta</Button>
            </div>
            <div>
              <Button variant="contained" color="error" sx={{ my: 1 }}>
                <Link href="/" underline="none" color="white">Volver al Home</Link>
              </Button>
            </div>
          </form>
        </Grid>
      </Paper>
    </Grid>
  )
}
