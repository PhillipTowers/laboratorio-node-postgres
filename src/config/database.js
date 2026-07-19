const { Pool } = require("pg");

const pool = new Pool({
    host: "postgres",
    port: 5432,
    user: "admin",
    password: "123456",
    database: "laboratorio",
});

module.exports = pool;