const { sequelize } = require('./models');

async function migrate() {
    try {
        console.log('Starting database migration...');
        await sequelize.sync({ force: true }); // This will drop existing tables and recreate them
        console.log('Database migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate(); 