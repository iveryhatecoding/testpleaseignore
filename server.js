import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Use CORS before routes
app.use(cors({
  origin: '*',
  methods: ['GET'],
}));


app.get('/api/clients', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.client_id, c.name, d.next_periodic_risk_assessment
      FROM clients c
      JOIN client_compliance_dummy_data d ON c.client_id = d.client_id
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ API error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
