module.exports = (sequelize, Sequelize) => {
  const MaterialUser = sequelize.define('MaterialUser', {
    read: Sequelize.BOOLEAN,
    UserId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    },
    MaterialId: {
      type: Sequelize.INTEGER,
      field: 'material_id'
    }
  });

  return MaterialUser;
}