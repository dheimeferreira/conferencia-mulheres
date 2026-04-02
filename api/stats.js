const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.POSTGRES_URL + "?sslmode=require" });

export default async function handler(req, res) {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT COUNT(*) as total FROM inscricoes');
        client.release();
        return res.status(200).json({ total: result.rows[0].total });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}