import pkg from 'pg';
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_5ayUd8ZAVBLG@ep-raspy-union-a15tf0bt-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  ssl: {
    rejectUnauthorized: false
  }
});
