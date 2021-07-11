module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define('Course', {
    name: Sequelize.STRING
  });

  Course.associate = (models) => {
    Course.hasMany(models.Module, { as: 'modules' });
    Course.hasMany(models.Discussion, { as: 'discussions' });
  }

  return Course;
};