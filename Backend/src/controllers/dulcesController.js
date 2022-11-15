const Dulces = require('../models/dulces');

exports.mostrarDulces = async(req,res)=>{
  try {
    let dulces = await Dulces.find();
    res.json(dulces);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error en buscar los dulces")
  }
}

exports.crearDulces = async(req,res)=>{
  try {
    let dulce;
    dulce = new Dulces(req.body)

    await dulce.save();
    res.send(dulce);
  } catch (error) {
    console.log(error)
    res.status(500).send("Hubo un error, no se pudo crear el dulce")
  }
}

exports.buscarDulces = async(req,res)=>{
  try {
    let dulce = await Dulces.findById(req.params.id);

    if(!dulce){
      res.status(404).json({msg: "El dulce no está registrado"})
    }

    res.json(dulce);
  } catch (error) {
    console.log(error)
    res.status(500).send("Hubo un error al buscar el dulce")
  }
}

exports.eliminarDulces = async(req,res)=>{
  try {
    let dulce = await Dulces.findById(req.params.id);
    if(!dulce){
      res.status(404).json({msg: "El dulce no está registrado"})
    }
  await Dulces.findOneAndRemove({_id: req.params.id})
    res.json({msg: 'Dulce eliminado con exito'})
  } catch (error) {
    console.log(error)
    res.status(500).send("Hubo un error al eliminar el dulce")
  }
}

exports.actualizarDulces = async(req,res)=>{
  try {
    const {nombre, precio_c, precio_v, categoria, cantidad, imagen} = req.body
    let dulce = await Dulces.findById(req.params.id)
    
    if(!dulce){
      res.status(404).json({msg:'El dulce no existe'})
    }

    dulce.nombre = nombre;
    dulce.precio_c = precio_c;
    dulce.precio_v  = precio_v;
    dulce.categoria = categoria;
    dulce.cantidad = cantidad;
    dulce.imagen = imagen;

    dulce = await Dulces.findOneAndUpdate({_id: req.params.id}, dulce, {new:true})

    res.json(dulce)

  } catch (error) {
    console.log(error)
    res.status(500).send("No se encontró el produco")
  }
}