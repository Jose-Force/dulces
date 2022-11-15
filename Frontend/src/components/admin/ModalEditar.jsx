import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { Avatar, Grid, Paper, Box, TextField, Button } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import swal from 'sweetalert';

const paperStyle = { padding: 20, height: '500px', width: 450, margin: "15vh auto" }

export default function ModalEditar({ open, handleClose, id, getDulces }) {
  const [dulces, setDulces] = useState({
    nombre: '',
    precio_c: '',
    precio_v: '',
    categoria: '',
    cantidad: '',
    imagen: ''
  }
  );

  useEffect(() => {
    if (id !== 0) {
      getDulcesId(id)
    }
  }, [id]);

  const getDulcesId = async (id) => {
    return await axios.get(`http://localhost:4000/api/dulces/${id}`)
      .then(async res => {
        const dato = await res.data;
        setDulces(dato)
      });
  }

  const editarDulces = async (id) => {
    await axios.put(`http://localhost:4000/api/dulces/${id}`, dulces)
    handleClose()
    confirmacion()
    getDulces()
  }

  const onChange = (event) => {
    setDulces({
      ...dulces,
      [event.target.name]: event.target.value
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    editarDulces(id)
  }

  const confirmacion = () => {
    swal("Producto actualizado correctamente",{
        icon: "success",
        buttons:false,
        timer: 1500,
      }
      
    )
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Paper elevation={5} style={paperStyle} >
          <Grid align="center">
            <Avatar style={{ backgroundColor: '#ffd248' }} ><EditIcon /></Avatar>
            <h3 style={{ margin: "3px" }}>Editar producto</h3>

            <form onSubmit={onSubmit}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <FastfoodOutlinedIcon  sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth
                  type="text"
                  variant="standard"
                  id="nombre"
                  name="nombre"
                  label="Nombre del producto"
                  value={dulces.nombre && dulces.nombre}
                  required
                  onChange={onChange} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
                <AttachMoneyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  type="text"
                  variant="standard"
                  id="precio_c"
                  name="precio_c"
                  label="Precio de compra"
                  value={dulces.precio_c && dulces.precio_c}
                  required
                  onChange={onChange} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
                <AttachMoneyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  type="text"
                  variant="standard"
                  id="precio_v"
                  name="precio_v"
                  label="Precio de venta"
                  value={dulces.precio_v && dulces.precio_v}
                  required
                  onChange={onChange} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
                <CategoryOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth
                  type="text"
                  variant="standard"
                  id="categoria"
                  name="categoria"
                  label="Categoria"
                  value={dulces.categoria && dulces.categoria}
                  required
                  onChange={onChange} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
                <StorefrontOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  type="text"
                  variant="standard"
                  id="cantidad"
                  name="cantidad"
                  label="Cantidad disponible"
                  value={dulces.cantidad && dulces.cantidad}
                  required
                  onChange={onChange} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 0.5 }}>
                <AddPhotoAlternateOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField fullWidth
                  type="text"
                  variant="standard"
                  id="imagen"
                  name="imagen"
                  label="URL de imagen"
                  value={dulces.imagen && dulces.imagen}
                  required
                  onChange={onChange} />
              </Box>

              <div>
                <Button variant="contained" color="primary" sx={{ my: 1 }} type="submit" onSubmit={onSubmit} >Actualizar producto</Button>
              </div>
            </form>
          </Grid>
        </Paper>

      </Modal>
    </div>
  );
}