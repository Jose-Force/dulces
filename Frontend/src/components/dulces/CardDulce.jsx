import * as React from 'react';
import { Box, Button,Card, Typography} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


export default function CardDulce({index}) {
  return (
    <Card sx={{ maxWidth: 300}}>

      <div style={{ display:"flex", justifyContent: 'center'}}>
        <img src={index.imagen} height="200hv"/>
      </div>

      <Typography variant="h6" component="div" textAlign="center">
        {index.nombre}
      </Typography>
      <Typography variant="p" component="div" textAlign="center">
        {`$${index.precio_v}`}
      </Typography>
      <Box>
        <Button color="botones">
          <ShoppingCartOutlinedIcon />
          Añadir
        </Button>
      </Box>

    </Card>
  );
}
