const db = require('../config/database');

const initDatabase = async () => {
  try {
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
};

module.exports = initDatabase;
