const express = require("express");

const productosRoutes = require("./routes/productos.routes");

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use("/productos", productosRoutes);

module.exports = app;