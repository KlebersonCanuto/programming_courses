module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Problems',
      'image_link',
      {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Problems',
      'image_link'
    );
  }
};
