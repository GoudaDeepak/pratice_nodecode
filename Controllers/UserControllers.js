const usermodel = require('../Models/UsersModel')
const helper = require('../Helpers/HelperMethods')
const { validationResult } = require('express-validator');

const signupUser = async(req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
         helper.prepareResponse(res,false,errors.array(),400)
    }
    const result = await usermodel.insertuser(req.body);
    helper.prepareResponse(res,result.status,result.msg,(result.status? 200: 400), result.data)

}
module.exports = {signupUser}