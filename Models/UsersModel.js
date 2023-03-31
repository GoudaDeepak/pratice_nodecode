const db = require('../Models')
const { Sequelize, DataTypes, QueryTypes } = require('sequelize')
const helper = require('../Helpers/HelperMethods')
const { password } = require('../Config/DbConnection')
const { validationResult } = require('express-validator');

const insertuser = async (params) => {
    let respo = {};
    try {
        const { usertype, firstname, lastname, email, mobilenumber, password } = params;

        // const parames = [req.body.usertype, req.body.firstname, req.body.lastname, req.body.email, req.body.mobilenumber, req.body.password]
        const passwordharsh = helper.getHashPassword(password)
        const user = await db.sequelize.query('INSERT INTO Users (User_Type, First_Name,Last_Name,Email,Mobile_Number,Password) VALUES (?,?,?,?,?,?)', {
            type: QueryTypes.INSERT,
            replacements: [usertype, firstname, lastname, email, mobilenumber, passwordharsh],
            logging: console.log
        })
        const [insertuser,] = await db.sequelize.query('select * from Users where user_id= LAST_INSERT_ID();');
        respo = { status: true, data: [{ insertuser }], msg:'Success' }


    } catch (e) {
        respo = { status: false, data: [], msg: e.message }
    }
    return respo;
}
const alluser = async (req, res) => {
    try {
        const user = await db.sequelize.query('SELECT * FROM Users', {
            type: QueryTypes.SELECT,
            logging: console.log
        })
        helper.prepareResponse(res, true, 'Success', 200, [{ user }])
    } catch (e) {
        helper.prepareResponse(res, false, e.message, 400, [], e.errno ?? e.parent.errno)
    }
}
const findoneuser = async (req, res) => {
    try {
        const userone = await db.sequelize.query('SELECT * FROM Users WHERE user_id = ?', {
            type: QueryTypes.SELECT,
            replacements: [req.params.user_id],
            logging: console.log
        })
        helper.prepareResponse(res, true, 'Success', 200, [{ userone }])
    } catch (e) {
        helper.prepareResponse(res, false, e.message, 400, [])
        //hello deepak
    }
}
const updateuser = async (req, res) => {
    try {
        const errors = validationResult(req)
    if(!errors.isEmpty()){
         helper.prepareResponse(res,false,errors.array(),400)
    }
        const { usertype, firstname, lastname, email, mobilenumber, password } = req.body
        const { user_id } = req.params
        const upuser = await db.sequelize.query("UPDATE Users SET User_Type = ?,First_Name =?,Last_Name =?,Email = ?,Mobile_Number = ?,Password = ? WHERE user_id = ? ", {
            type: QueryTypes.UPDATE,
            replacements: [usertype, firstname, lastname, email, mobilenumber, password, user_id],
            logging: console.log
        })
        const newuser = await db.sequelize.query('select * from Users where user_id = ?', {
            type: QueryTypes.SELECT,
            replacements: [req.params.user_id],
            logging: console.log 
        })
        helper.prepareResponse(res, true, 'Success', 200, [{ newuser }])
    } catch (e) {
        helper.prepareResponse(res, false, e.message, 400, [])
    }
}
const deleteuser = async (req, res) => {
    try {
        //  const {id} = req.params
        const user = await db.sequelize.query('DELETE FROM Users WHERE user_id = ?', {
            replacements: [req.params.user_id],
            type: QueryTypes.DELETE,
            logging: console.log
        })
        helper.prepareResponse(res, true, 'Success', 200, [{ user: 'deleted' }])
    } catch (e) {
        helper.prepareResponse(res, false, e.message, 400, [])
    }
}
const store = async (req, res) => {
    try {
        const storeuser = await db.sequelize.query('call innerjoin', {
            type: QueryTypes.SELECT,
            logging: console.log
        })
        helper.prepareResponse(res, true, 'Success', 200, [{ storeuser }])
    } catch (e) {
        helper.prepareResponse(res, false, e.message, 400, [])
    }
}
const loginuser = async (req, res) => {
    try {
        const { userid, deviceid, devicename, device_osversion, appversion, ipaddress, devicetype, apptoken, email, password } = req.body
        const user = await db.sequelize.query('select * from Users where Email = ?', {
            type: QueryTypes.SELECT,
            replacements: [email],
            logging: console.log
        })
        if (user.length < 1) {
            helper.prepareResponse(res, false, 500, ['email not exist'])
        }
        const match = await helper.CompareHashPassword(password, user[0].Password)
        if (!match) {
            helper.prepareResponse(res, false, 500, ['password not match '])
        }
        if (match) {
            const token = helper.createtoken(user[0].Email, user[0].User_Type, user[0].First_Name, user[0].Last_Name, user[0].Mobile_Number)
            //console.log(token)
            const loginuser = await db.sequelize.query('INSERT INTO User_Session (user_id,Device_id,Auth_Token,Device_Name,Device_Os_Version,App_Version,Ip_Address,Device_Type,App_Token) VALUES (?,?,?,?,?,?,?,?,?)', {
                type: QueryTypes.INSERT,
                replacements: [userid, deviceid, token, devicename, device_osversion, appversion, ipaddress, devicetype, apptoken],
                logging: console.log
            })
            const [inseruser,] = await db.sequelize.query('select * from User_Session where user_session_id= LAST_INSERT_ID();')
            helper.prepareResponse(res, true, 'Success', 200, [{ inseruser }])
        }
    } catch (e) {
        helper.prepareResponse(res, false, e.message, 400, [])
    }
}

module.exports = { insertuser, alluser, findoneuser, deleteuser, updateuser, store, loginuser }