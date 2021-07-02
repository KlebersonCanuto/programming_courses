module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define('Course', {
    name: Sequelize.STRING
  });

  return Course;
};