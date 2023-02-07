const { check } = require('express-validator');
const helper = require('./../Helpers/HelperMethods')

const emailPasswordValidator = async (req, res, next) => {

      return  [check('email').isEmail().withMessage('must be vaild formt'),
    check('password').isLength({ min: 6 }).withMessage('minimum 6 char')];
    


}
module.exports = { emailPasswordValidator }


