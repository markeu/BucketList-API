/* eslint-disable import/prefer-default-export */
import UserModel from '../models/userModel';
import { encryptPassword, generateToken } from '../utilities/encrypt';
import pool from '../db/db';

const { createUser } = UserModel;

/**
 *
 *
 * @export
 * @class UsersController
 */
export class UsersController {
  /**
   * Signup middleware - Create User Account
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} Object containing token to the user
   * @memberof UsersController
   */
  static async signUp(req, res) {
    const data = req.body;
    const { password } = data;
    data.password = encryptPassword(password);
    const value = {
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
      email: data.email,
    };
    try {
      const user = await createUser(value);
      if (user) {
        const token = generateToken(user);
        const details = { ...user, token };
        return res.status(201).send({
          status: 'success',
          data: details,
        });
      }
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          status: 'error',
          error: 'User with email already exist',
        });
      }
      return res.status(500).send({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }

  /**
   *
   * Login Middleware - Logs user into the application
   * @static
   * @param {object} req
   * @param {object} res
   * @param {function} next
   * @returns {object} Object containing token to the user
   * @memberof UsersController
   */
  static async login(req, res) {
    try {
      const data = req.body;
      const query = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await pool.query(query, [req.body.email]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 'error',
          error: 'The credentials you provided is incorrect',
        });
      }
      const passwordValid = await decryptPassword(data.password, rows[0].password);

      if (!passwordValid) {
        return res.status(400).json({
          status: 'error',
          error: 'The credentials you provided is incorrect',
        });
      }
      const userData = { id: rows[0].id, email: rows[0].email };
      const token = await generateToken(userData);
      return res.status(201).json({
        status: 'success',
        data: { ...rows[0], token },
      });
    } catch (err) {
      return res.status(500).json({
        status: 'error',
        error: 'Internal server error',
      });
    }
  }
}
