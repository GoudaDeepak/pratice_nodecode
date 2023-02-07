const Dbconnection = require('../Config/DbConnection')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
  Dbconnection.database,
  Dbconnection.username,
  Dbconnection.password,
  {
    host: Dbconnection.Host,
    dialect: Dbconnection.dialect,
    // operatorAliases: false

  }
)
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
// db.users = require('./UserModels')(sequelize,DataTypes)
// db.user_session = require('./LoginUserModels')(sequelize,DataTypes)
sequelize.sync({ force: false });
console.log("All models were synchronized successfully.");

module.exports = db