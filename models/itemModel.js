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

    /**
   * @static
   * @description Method to select all items with details
   * @param {number} id Id of the items to be returned
   * @returns {array} All items in the DB
   * @memberof Item
   */
  static async getItemsByBucketId(id) {
    const data = await pool.query( "SELECT * FROM items WHERE bucketList_id= $1;", [id]);
      return data.rows;
  }
  /**
   * @static
   * @description Method to select one specific item
   * @param {number} id Id of the items to be returned
   * @returns {object} Single item details
   * @memberof items
   */  
  static async selectOneitem(id) {
    const data = await pool.query( "SELECT * FROM items WHERE id= $1;", [id]);
    return data.rows[0];
  }

  /**
   * @static
   * @description Method to update item
   * @param {number} id Id of the item to be updated
   * @param {string} name new detail of the item
   * @returns {object} Details of the newly updated item
   * @memberof ItemModel
   */

  static async updateItem(item, id) {
    const {
        name,
        done,
    } = item;
    const date = new Date();
    
    const { rows } = await pool.query(
    `UPDATE items
    SET name= $2, done= $3, date_modified= $4
    WHERE id= $1 RETURNING *`, [id, name, done, date]
    );
    return rows[0];
  }

  /**
   * @static
   * @description Method to deleteitem
   * @param {number} id Id of the item to be deleted
   * @param {string} name new detail of the item
   * @returns {object} Details of the newly deleted item
   * @memberof ItemModel
   */
  static async deleteOneItem(id) {
    const data = await pool.query("DELETE FROM items WHERE id= $1", [id]);
    if (data.rowCount === 1) return true;
    return false;
  }
}
