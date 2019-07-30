import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();
const pool = new Pool({
  user: 'uche',
  host: 'localhost',
  database: 'bucketList',
  password: '',
  port: 5432,
});

pool.on('connect', () => {
  console.log('connected to database');
});


export default pool;
