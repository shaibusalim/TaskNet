const Sequelize = require('sequelize');
const config = require('./config.json');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];



const Database = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
});


Database
.authenticate()
.then(() => {
    console.log('Database connected successfully!');
})
.catch((error) =>{
    console.error(error);
}); 

module.exports = Database;