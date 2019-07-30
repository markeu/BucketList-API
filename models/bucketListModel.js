import pool from '../db/db';

/**
 *
 *
 * @export
 * @class BucketList
 */
export default class BucketLists {
  /**
     *
     * Trip model to create new bucketList
     * @static
     * @param {object} bucketList
     * @returns {object} bucketList data
     * @memberof BucketList
     */
  static async create(bucketList) {
    const date = new Date();
    const {
      name,
      created_by
      
    } = bucketList;
    const { rows } = await pool.query(`INSERT INTO bucketLists
      ( name, date_modified, created_by) 
      VALUES ($1, $2, $3)
      RETURNING *`, [name, date, created_by]);
    return rows[0];
  }
}