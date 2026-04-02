// api/inscrever.js
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

export default async function handler(req, res) {
    // Só aceita pedidos do tipo POST (envio de formulário)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }

    const { nome, whatsapp, igreja } = req.body;

    try {
        const client = await pool.connect();
        // Comando para inserir no banco Neon que você criou
        const queryText = 'INSERT INTO inscricoes(nome, whatsapp, igreja) VALUES($1, $2, $3)';
        await client.query(queryText, [nome, whatsapp, igreja]);
        client.release();

        return res.status(200).json({ message: 'Inscrição realizada com sucesso!' });
    } catch (err) {
        console.error('Erro no banco:', err);
        return res.status(500).json({ error: 'Erro ao salvar no banco de dados' });
    }
}