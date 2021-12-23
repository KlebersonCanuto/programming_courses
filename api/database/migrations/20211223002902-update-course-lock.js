module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Courses',
      'locked',
      {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Courses',
      'locked'
    );
  }
};
