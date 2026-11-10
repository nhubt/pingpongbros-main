require('dotenv').config();
const { Client } = require('pg');

async function test() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 15000
  });

  try {
    await client.connect();
    const result = await client.query('SELECT 1 AS connected');
    console.log('Kết nối Supabase thành công!', result.rows);
  } catch (err) {
    console.error('Kết nối thất bại:', err.code, err.message);
  } finally {
    await client.end().catch(() => {});
  }
}

test();