import pool from '../db/db';

/**
 *
 *
 * @export
 * @class Items
 */
export default class Items {
  /**
     *
     * Trip model to create new Item
     * @static
     * @param {object} Item
     * @returns {object} Item data
     * @memberof Item
     */
  static async create(Item) {
    const date = new Date();
    const {
      name,
      bucketList_id, 
    } = Item;
    const { rows } = await pool.query(`INSERT INTO items
      ( name, bucketList_id, date_modified) 
      VALUES ($1, $2, $3)
      RETURNING *`, [name, bucketList_id, date]);
    return rows[0];
  }

  /**
   * @static
   * @description Method to select all items with details
   * @param {number} id Id of the items to be returned
   * @returns {array} All items in the DB
   * @memberof Item
   */
  static async getItemQuery() {
    const data = await pool.query(
      `SELECT * FROM items`
      );
      return data.rows;
  }
}
