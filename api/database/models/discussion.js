module.exports = (sequelize, Sequelize) => {
  const Discussion = sequelize.define('Discussion', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    topic: Sequelize.STRING,
    updated: Sequelize.BOOLEAN
  });

  return Discussion;
};