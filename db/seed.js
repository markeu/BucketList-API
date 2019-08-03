import pool from '../db/db';

/**
 * Insert super admin after tables are created
 * @name insertSeed
 * @returns {String} details of insert
 */
const insertSeed = async () => {
  const date = new Date();
  const seed = `INSERT INTO bucketLists
  ( name, date_modified, created_by) 
  VALUES ($1, $2, $3)`

  try {
    await pool.query(seed, ['someone', date, 1]);
   console.log('insert bucketList succeeded');
  } catch (error) {
    console.log(error);
  }
};

insertSeed();
