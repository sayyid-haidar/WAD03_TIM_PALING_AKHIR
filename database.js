const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',       // username database
    host: 'localhost',
    database: 'postgresWAD', // nama database
    password: 'kataguaa',  // password database
    port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};