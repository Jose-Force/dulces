import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardDulce from './CardDulce';
import axios from "axios";
import Carrusel from '../carrusel/Carrusel'
import 'bootstrap/dist/css/bootstrap.min.css'
export default function ResponsiveGrid() {

  const [dulces, setDulces] = useState();

  const getDulces = async () => {
    return await axios.get("http://localhost:4000/api/dulces")
      .then(async res => {
        const dato = await res.data;
        setDulces(dato)
      });
  }
  useEffect(() => {
    getDulces()
  }, []);


  return (
    <>

<Carrusel />

      <Box sx={{ flexGrow: 1, my: 5, mx: 10 }}>
     
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {dulces !== undefined ? dulces.map((index) => (
            <Grid item xs={12} sm={3} md={3} key={index._id}>
              <CardDulce index={index} key={index._id} />
            </Grid>
          )) : null}
        </Grid>
      </Box>
    </>

  );
}
