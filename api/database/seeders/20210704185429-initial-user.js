const bcrypt = require('bcrypt')

require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync(process.env.ADMIN_PASSWORD, Number(process.env.HASH));
    return queryInterface.bulkInsert('Users', [{
      username: 'admin',
      email: process.env.ADMIN_EMAIL,
      password,
			emailConfirmed: true,
			profileImageURL: 'https://developers.google.com/web/images/contributors/no-photo.jpg?hl=pt',
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
