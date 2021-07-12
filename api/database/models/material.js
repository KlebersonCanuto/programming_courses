module.exports = (sequelize, Sequelize) => {
  const Material = sequelize.define('Material', {
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    complementary: Sequelize.BOOLEAN,
    number: Sequelize.INTEGER,
    ModuleId: {
      type: Sequelize.INTEGER,
      field: "module_id"
    }
  });

  return Material;
};