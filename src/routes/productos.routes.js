const express = require("express");

const router = express.Router();

const productosController = require("../controllers/productos.controller");

router.get("/", productosController.obtenerProductos);
router.get("/:id", productosController.obtenerPorId);
router.post("/", productosController.añadirProducto);
router.put("/:id", productosController.actualizarProducto);
router.delete("/:id", productosController.borrarProducto);


module.exports = router;