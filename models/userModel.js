/* eslint-disable camelcase */
import pool from '../db/db';
/**
 *
 *
 * @export
 * @class Users
 */
export default class UserModel {
  /**
   *
   * User model to create user account
   * @static
   * @param {object} user
   * @returns {object} User data
   * @memberof Users
   */
  static async createUser(user) {
    const {
      first_name, last_name, password, email,
    } = user;
    const { rows } = await pool.query(`INSERT INTO users
        (first_name, last_name, password, email)
        VALUES ($1, $2, $3, $4)
        RETURNING *`, [first_name, last_name, password, email]);
    return rows[0];
  }


  /**
     *
     *
     * @static
     * @param {string} userData
     * @returns {object} User data according to supplied email
     * @memberof Users
     */
  static async findUserInput(user) {
    const { email } = user;
    const { rows } = await pool.query(`SELECT * FROM users
        (email) VALUES ($1)
        RETURNING *`, [email]);
    if (rows[0].rowCount < 1) {
      return false;
    }
    return rows[0];
  }
}
