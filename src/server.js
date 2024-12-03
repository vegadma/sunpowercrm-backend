const app = require('./app');
const { sequelize } = require('./models');

// Start the server
const PORT = process.env.PORT || 5000;

(async () => {
    try {
        // Test database connection
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Start Express server
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

