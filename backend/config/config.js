const { Sequelize } = require('sequelize')
const sequelize = new Sequelize({ dialect: 'sqlite', storage: 'backend/database.sqlite' });


module.exports = sequelize
//'demo-ex', 'postgres', '0000', {dialect:'postgres', define:{timestamps:false}}