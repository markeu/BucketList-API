import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to database');
});


export default pool;

// user: 'uche',
// host: 'localhost',
// database: 'bucketList',
// password: '',
// port: 5432,