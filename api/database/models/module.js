module.exports = (sequelize, Sequelize) => {
  const Module = sequelize.define('Module', {
    name: Sequelize.STRING,
    number: Sequelize.INTEGER,
    course_id: Sequelize.INTEGER
  });

  Module.associate = (models) => {
    Module.belongsTo(models.Course, { foreignKey: 'course_id' });
    Module.hasMany(models.Material, { as: 'materials' });
    Module.hasMany(models.Quiz, { as: 'quizzes' });
    Module.hasMany(models.Problem, { as: 'problems' });
  }

  return Module;
};