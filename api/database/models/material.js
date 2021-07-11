module.exports = (sequelize, Sequelize) => {
  const Material = sequelize.define('Material', {
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    complementary: Sequelize.BOOLEAN,
    number: Sequelize.INTEGER,
    module_id: Sequelize.INTEGER
  });

  Material.associate = (models) => {
    Material.belongsTo(models.Module, { foreignKey: 'module_id' });
  }

  return Material;
};