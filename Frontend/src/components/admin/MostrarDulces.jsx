import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Grid, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, TablePagination, Button, ButtonBase, Toolbar, Link } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Navbar from '../navBar/NavBar'
import swal from 'sweetalert';
import ModalEditar from './ModalEditar';
import ModalCrear from './ModalCrear';
import { DataContext } from "../../context/DataContext";
import { useNavigate } from 'react-router-dom';
import { width } from '@mui/system';

export default function StickyHeadTable() {
  //Controlador de modal
  const [openEdit, setOpenEdit] = useState(false);
  const [openCrear, setOpenCrear] = useState(false);
  const [id, setId] = useState(0)
  const { datosUsuario } = useContext(DataContext);
  const navigate = useNavigate()
  console.log(datosUsuario)
  const handleOpen = (_id) => {
    setOpenEdit(true)
    setId(_id)
  };
  const handleClose = () => setOpenEdit(false);

  const handleOpenCrear = () => {
    setOpenCrear(true)
  };
  const handleCloseCrear = () => setOpenCrear(false);
  //Paginacion
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dulces, setDulces] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //Peticiones
  const getDulces = async () => {
    return await axios.get("http://localhost:4000/api/dulces")
      .then(async res => {
        const dato = await res.data;
        setDulces(dato)
      });
  }

  const deleteDulces = async (id) => {
    return await axios.delete(`http://localhost:4000/api/dulces/${id}`)
      .then(async res => {
        await getDulces()
      });
  }

  const confirmacion = (id) => {
    swal({
      title: "¿Está seguro que desea eliminar este producto?",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        eliminar: {
          text: "Eliminar",
          value: "delete"
        }
      }

    })
      .then((value) => {
        switch (value) {

          case "delete":
            swal("¡Producto eliminado con exito!", {
              icon: "success",
              button: false
            });
            deleteDulces(id)
            break;

          default:
            swal("Se canceló la operación", {
              icon: "error",
              button: false
            });
        }
      });
  }

  useEffect(() => {
    getDulces()
  }, []);

  const columns = [
    "Nombre", "Precio de compra", "Precio de venta", "Categoría", "Cantidad", "Imagen", "Eliminar", "Editar"
  ];

  return (
    <>
    {(datosUsuario !== undefined && datosUsuario.admin === true)? 
      <Grid container >
        <Navbar />

        <Paper sx={{ m: 'auto', p: 0, display: 'flex', flexDirection: 'column', alignItems: "center", my: 2 }}>

          <Button variant="contained" sx={{ m: 2, color: "black" }} onClick={() => handleOpenCrear()}>Agregar producto</Button>

          <TableContainer sx={{ minHeight: '60vh', maxHeight: '60vh' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow >
                  {columns.map((column) => (
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', backgroundColor: 'botones.main' }}
                      key={column}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dulces !== undefined && dulces.length !== 0 ? dulces
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row._id} hover >
                      <TableCell style={{ maxWidth: 150 }}>{row.nombre}</TableCell>
                      <TableCell align="center">{`$${row.precio_c}`}</TableCell>
                      <TableCell align="center">{`$${row.precio_v}`}</TableCell>
                      <TableCell align="center">{row.categoria}</TableCell>
                      <TableCell align="center">{row.cantidad}</TableCell>
                      <TableCell align="center"><img src={row.imagen} width="30px" /></TableCell>
                      <td><Button onClick={() => confirmacion(row._id)}><DeleteOutlineOutlinedIcon /></Button></td>
                      <td><Button onClick={() => handleOpen(row._id)}><EditOutlinedIcon /></Button> </td>
                    </TableRow>
                  )) : <TableRow><TableCell align={'center'}>{'¡No hay datos!'}</TableCell></TableRow>}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={dulces !== undefined ? dulces.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <ModalEditar open={openEdit} handleClose={handleClose} id={id} getDulces={getDulces} />
          <ModalCrear open={openCrear} handleClose={handleCloseCrear} getDulces={getDulces} />
        </Paper>
      </Grid>
      :
      <div style={{ backgroundColor: '#fffff', height: '100vh', display: 'flex', flexDirection:' column', alignItems: 'center', justifyContent: 'center' }}>

        <img src='https://reygif.com/media/1/cupcakes-957.gif' style={{display:'flex', position:'absolute'}} />
        <img src='https://i.pinimg.com/originals/f9/b6/71/f9b67166545aee0783359c566fab740c.gif' style={{display:'flex', position:'absolute', marginTop: '154px'}}/>
      </div>
      }
    </>

  );
}