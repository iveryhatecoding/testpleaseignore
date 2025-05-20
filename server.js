import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Allow all origins (for testing GitHub Pages frontend)
app.use(cors({
  origin: '*'
}));

app.get('/api/clients', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.client_id, c.first_name, c.last_name, d.next_periodic_risk_assessment
      FROM clients c
      JOIN client_compliance_dummy_data d ON c.client_id = d.client_id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('[SERVER ERROR]', err);
    res.status(500).json({ error: 'Internal Server Error: ' + err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

