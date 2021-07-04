module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define('Course', {
    name: Sequelize.STRING
  });

  Course.associate = (models) => {
    Course.hasMany(models.Module, { foreignKey: "id", as: 'modules' });
    Course.hasMany(models.Material, { foreignKey: "id", as: 'materials' });
    Course.hasMany(models.Quiz, { foreignKey: "id", as: 'quizzes' });
    Course.hasMany(models.Problem, { foreignKey: "id", as: 'problems' });
  }

  return Course;
};