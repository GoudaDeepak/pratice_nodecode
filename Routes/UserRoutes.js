const userController = require('./../Controllers/UserControllers')
const usermodel = require('./../Models/UsersModel')
const router = require('express').Router()
const authocheck = require('../Middelware/AuthoToken')
const { emailPasswordValidator } = require('./../Middelware/RequestBodyValidate');
const { check } = require('express-validator');


router.post('/signup', [check('email').isEmail().withMessage('must be vaild formt'),
check('password').isLength({ min: 6 }).withMessage('minimum 6 char')],userController.signupUser)

router.get('/alluser', usermodel.alluser)
router.get('/:user_id', usermodel.findoneuser)
router.delete('/:user_id',authocheck, usermodel.deleteuser)
router.put('/:user_id', usermodel.updateuser)
router.get('/loginuser/data', usermodel.store)
router.post('/loginuser', usermodel.loginuser)


module.exports = router