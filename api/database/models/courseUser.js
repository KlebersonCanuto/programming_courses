module.exports = (sequelize, Sequelize) => {
  const CourseUser = sequelize.define('CourseUser', {
    conclusion: Sequelize.INTEGER,
    conclude: Sequelize.BOOLEAN,
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