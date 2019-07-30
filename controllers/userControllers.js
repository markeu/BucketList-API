/* eslint-disable import/prefer-default-export */
import UserModel from '../models/userModel';
import { encryptPassword, decryptPassword, generateToken } from '../utilities/encrypt';
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
}
