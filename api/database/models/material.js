module.exports = (sequelize, Sequelize) => {
  const Material = sequelize.define('Material', {
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    content: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    },
    complementary: Sequelize.BOOLEAN,
    number: Sequelize.INTEGER,
    ModuleId: {
      type: Sequelize.INTEGER,
      field: "module_id"
    }
  });

  return Material;
};