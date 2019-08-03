import pool from '../db/db';

/**
 * Insert super admin after tables are created
 * @name insertSeed
 * @returns {String} details of insert
 */
const userSeed = async () => {
  const seed = `INSERT INTO users
  (first_name, last_name, password, email)
  VALUES ('uche', 'uzochukwu', 'mickey', 'ucheuzo@gmail.com');
`;

  try {
    await pool.query(seed);
   console.log('insert user succeeded');
  } catch (error) {
    console.log(error);
  }
};

userSeed();
