const { Sequelize } = require('sequelize');
const Config = require('../config');

const sequelize = new Sequelize(Config.DBNAME, Config.DBUSER, Config.DBPASS, {
    host: Config.DBHOST,
    dialect: 'mysql',
});

try {
    sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    });
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;
