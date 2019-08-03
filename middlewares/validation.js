/* eslint-disable camelcase */
import validationHelp from '../utilities/validationHelp';
import { emailRegex, passwordRegex, descriptionRegex } from '../utilities/rexegen';

const {
  checkForEmptyFields, checkPatternedFields, checkStringFields, checkIntergerFields,
} = validationHelp;

export default {
  auth: (req, res, next) => {
    const errors = [];
    const {
      first_name, last_name, email, password,
    } = req.body;


    if (req.path.includes('signup')) {
      errors.push(...checkForEmptyFields('first_name', first_name));
      errors.push(...checkForEmptyFields('last_name', last_name));
      errors.push(...checkStringFields('first_name', first_name));
      errors.push(...checkStringFields('last_name', last_name));
    }
    errors.push(...checkPatternedFields('email', email, emailRegex));
    errors.push(...checkForEmptyFields('password', password, passwordRegex));

    if (errors.length) {
      return res.status(400).json({
        Status: 'error',
        error: errors,
      });
    }
    return next();
  },
}