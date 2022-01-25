module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Materials',
      'video_link',
      {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: ''
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(
      'Materials',
      'video_link'
    );
  }
};
