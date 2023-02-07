const bcrypt = require('bcrypt')
const { Sequelize, DataTypes } = require('sequelize')
const jwt = require('jsonwebtoken');

 const getHashPassword = (password)=>{ 
    const salt = bcrypt.genSaltSync(10);
     return bcrypt.hashSync(password, salt)
}
const CompareHashPassword = (password,hashpassword) =>{
   return  bcrypt.compare(password,hashpassword );  
}
const createtoken = (Email,User_Type,First_Name,Last_Name,Mobile_Number)=>{
   return jwt.sign({
      Email:Email,
      User_Type:User_Type,
      First_Name:First_Name,
      Last_Name:Last_Name,
      Mobile_Number:Mobile_Number
   }, 'this is a token', { expiresIn: "24h" });
}

const prepareResponse = (res, status= true, messsage= "Success", httpStatus=200, data= [], errorCode= 0)=>{
res.status(httpStatus).send({status, messsage, data, errorCode})
}

module.exports={getHashPassword,CompareHashPassword,createtoken, prepareResponse}