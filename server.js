import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));

app.get('/api/clients', async (req, res) => {
  console.log('[GET /api/clients] Request received');
  try {
    const result = await pool.query(`
      SELECT c.client_id, c.first_name, c.last_name, d.next_periodic_risk_assessment
      FROM clients c
      JOIN client_compliance_dummy_data d ON c.client_id = d.client_id
    `);
    console.log('[GET /api/clients] Query successful');
    res.json(result.rows);
  } catch (err) {
    console.error('[GET /api/clients] ERROR:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server started on port ${PORT}`);
});
