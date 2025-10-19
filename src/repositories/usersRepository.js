const db = require('../../database');

async function getAll() {
    const { rows } = await db.query('SELECT id, username, name, email, role FROM users');
    return rows;
}

async function findByUsername(username) {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return rows[0];
}

async function create({ username, name, email, role }) {
    const { rows } = await db.query(
        'INSERT INTO users (username, name, email, role) VALUES ($1, $2, $3, $4) RETURNING *',
        [username, name, email, role]
    );
    return rows[0];
}

async function update(usernameParam, { username, name, email, role }) {
    const { rows } = await db.query(
        'UPDATE users SET username = $1, name = $2, email = $3, role = $4 WHERE username = $5 RETURNING *',
        [username, name, email, role, usernameParam]
    );
    return rows[0];
}

module.exports = {
    getAll,
    findByUsername,
    create,
    update,
};