module.exports = (sequelize, Sequelize) => {
  const Discussion = sequelize.define('Discussion', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    topic: Sequelize.STRING,
    updated: Sequelize.BOOLEAN,
    CourseId: {
      type: Sequelize.INTEGER,
      field: "course_id"
    }
  });

  Discussion.associate = (models) => {
    Discussion.hasMany(models.Comment, { as: 'comments' });
  }

  return Discussion;
};