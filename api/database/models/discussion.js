module.exports = (sequelize, Sequelize) => {
  const Discussion = sequelize.define('Discussion', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    topic: Sequelize.STRING,
    updated: Sequelize.BOOLEAN,
    course_id: Sequelize.INTEGER
  });

  Discussion.associate = (models) => {
    Discussion.hasOne(models.User, { as: 'user' });
    Discussion.hasMany(models.Comment, { as: 'comments' });
    Discussion.belongsTo(models.Course, { foreignKey: 'course_id' });
  }

  return Discussion;
};