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
    video_link: {
      type: Sequelize.STRING,
    },
    complementary: Sequelize.BOOLEAN,
    number: Sequelize.INTEGER,
    ModuleId: {
      type: Sequelize.INTEGER,
      field: 'module_id'
    },
    done: {
      type: Sequelize.VIRTUAL
    },
    locked: {
      type: Sequelize.VIRTUAL
    },
  });

  return Material;
};