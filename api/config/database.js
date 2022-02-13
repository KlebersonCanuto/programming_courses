require('dotenv').config();

const database = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	dialect: 'mysql',
};

if (process.env.NODE_ENV === 'test') {
	database.database = process.env.DB_TEST_NAME;
}

if (process.env.NODE_ENV === 'production') {
	database.dialectOptions = {
		ssl:'Amazon RDS'
	};
}

module.exports = database;