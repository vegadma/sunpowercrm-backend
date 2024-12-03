require('dotenv').config(); // Load environment variables from .env
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; // Default to 'development'
const db = {};

// Database configuration using environment variables
const config = {
    username: process.env.DB_USERNAME || 'default_user',
    password: process.env.DB_PASSWORD || 'default_password',
    database: process.env.DB_DATABASE || 'default_database',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DIALECT || 'postgres',
    port: process.env.DB_PORT || 5432,
};

// Initialize Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: console.log, // Optional: Enable logging for debugging
});

// Read all model files in the current directory and load them
fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Set up model associations if defined
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize; // Add Sequelize instance
db.Sequelize = Sequelize; // Add Sequelize library

module.exports = db;

