module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define('Course', {
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true
      }
    }
  });

  Course.associate = (models) => {
    Course.hasMany(models.Module, { as: 'modules' });
  }

  return Course;
};