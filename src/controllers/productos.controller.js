const pool = require("../config/database");

const obtenerProductos = async (req, res) => {
    try {

        const resultado = await pool.query(
            "SELECT * FROM productos"
        );

        res.json(resultado.rows);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const obtenerPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await pool.query(
            "SELECT * FROM productos WHERE id =$1", [id]
        );

        if (resultado.rows.length === 0) {
                return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }
        res.json(resultado.rows[0]);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const añadirProducto = async (req, res) => {
    try {
        const {nombre , precio} = req.body
        const resultado = await pool.query(
            "INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING * ",
            [nombre, precio]
        );

        res.status(201).json(resultado.rows[0]);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const actualizarProducto = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, precio } = req.body;

        const resultado = await pool.query(
            "UPDATE productos SET nombre = $1 , precio = $2 WHERE id = $3 RETURNING *",
            [nombre, precio, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json(resultado.rows[0]);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

const borrarProducto = async (req, res) => {
    try {
        const id = req.params.id
        const resultado = await pool.query(
            "DELETE FROM productos WHERE id = $1",[id]
        );

        if (resultado.rowCount === 0) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.status(204).send();
    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }
};

module.exports = {
    obtenerProductos,
    obtenerPorId,
    añadirProducto,
    actualizarProducto,
    borrarProducto
};