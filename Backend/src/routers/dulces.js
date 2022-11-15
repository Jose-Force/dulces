const express = require('express');
const router = express.Router();
const dulcesController = require('../controllers/dulcesController');

router.get("/", dulcesController.mostrarDulces);
router.post("/", dulcesController.crearDulces);
router.get("/:id", dulcesController.buscarDulces);
router.delete("/:id", dulcesController.eliminarDulces);
router.put("/:id", dulcesController.actualizarDulces);
module.exports = router;