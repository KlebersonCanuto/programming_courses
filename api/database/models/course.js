module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define('Course', {
    name: Sequelize.STRING
  });

  Course.associate = (models) => {
    Course.hasMany(models.Module, { foreignKey: "course_id", as: 'modules' });
    Course.hasMany(models.Material, { foreignKey: "course_id", as: 'materials' });
    Course.hasMany(models.Quiz, { foreignKey: "course_id", as: 'quizzes' });
    Course.hasMany(models.Problem, { foreignKey: "course_id", as: 'problems' });
  }

  return Course;
};