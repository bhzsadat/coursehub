require('dotenv').config();
const { sequelize } = require('./models');

async function migrate() {
    try {
        console.log('Starting database migration...');
        console.log('Environment:', process.env.NODE_ENV);
        console.log('Database URL exists:', !!process.env.POSTGRES_URL);
        
        await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
        console.log('Database migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message
        });
        process.exit(1);
    }
}

migrate(); 