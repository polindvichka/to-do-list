const pool = require('./database');

const create  = async (description) =>  {
    return await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description,]);
};

const get = async () => await pool.query('SELECT * FROM todo');

const remove = async (id) => {
    return await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
};

module.exports = { create, get, remove };