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

  /**
   * @static
   * @description Method to select all bucketLists with details
   * @param {number} id Id of the bucketLists to be returned
   * @returns {array} All bucketLists in the DB
   * @memberof BucketList
   */
  static async getbucketListQuery(page, limit) {
    const data = await pool.query(
      `SELECT * FROM bucketLists LIMIT ${limit} OFFSET ${(page - 1) * limit}`
      );
      return data.rows;
  }

  /**
   * @static
   * @description Method to select one specific BucketList
   * @param {number} id Id of the BucketList to be returned
   * @returns {object} Single BucketList details
   * @memberof BucketList
   */  
  static async selectOneBucketList(id) {
    const data = await pool.query( "SELECT * FROM bucketLists WHERE id= $1;", [id]);
    return data.rows[0];
  }

  /**
   * @static
   * @description Method to update bucketlist
   * @param {number} id Id of the bucketlist to be updated
   * @param {string} name new detail of the property
   * @returns {object} Details of the newly updated bucketlist
   * @memberof BucketListModel
   */
  static async updateBucketList({ name, id }) {
    const data = await pool.query(
      `UPDATE bucketLists SET name= $1 
      WHERE id= $2 RETURNING *`, [name, id]
    );
    return data.rows[0];
  }
}
