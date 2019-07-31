/* eslint-disable no-tabs */
/* eslint-disable no-console */
import pool from './db';


const tablesQuerry = `    
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_on TIMESTAMP WITHOUT TIME ZONE DEFAULT  (now () AT TIME ZONE 'WAT' )
    );
    CREATE TABLE IF NOT EXISTS bucketLists (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        created_by INT NOT NULL,
        date_created TIMESTAMP WITHOUT TIME ZONE DEFAULT (now () AT TIME ZONE 'WAT' ),
        date_modified TIMESTAMP WITHOUT TIME ZONE,
        FOREIGN KEY (created_by) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        bucketList_id INT NOT NULL,
        date_created TIMESTAMP WITHOUT TIME ZONE DEFAULT (now () AT TIME ZONE 'WAT' ),
        date_modified TIMESTAMP WITHOUT TIME ZONE,
        done VARCHAR NOT NULL DEFAULT 'false',
        FOREIGN KEY (bucketList_id) REFERENCES bucketLists(id)
    );
`;


const createTable = () => {
  console.log('called');
  pool.query(`${tablesQuerry}`).then(() => {
    console.log('Tables created successfully');
  }).catch((error)=> {
    console.log(error);
  });
};


createTable();
