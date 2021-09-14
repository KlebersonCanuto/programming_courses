module.exports = (sequelize, Sequelize) => {
  const CourseUser = sequelize.define('CourseUser', {
    conclusion: Sequelize.DECIMAL,
    conclusionMaterials: Sequelize.DECIMAL,
    conclusionQuizzes: Sequelize.DECIMAL,
    conclusionProblems: Sequelize.DECIMAL,
    UserId: {
      type: Sequelize.INTEGER,
      field: 'user_id'
    },
    CourseId: {
      type: Sequelize.INTEGER,
      field: 'course_id'
    }
  });

  return CourseUser;
}