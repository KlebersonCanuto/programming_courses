module.exports = (sequelize, Sequelize) => {
  const Problem = sequelize.define('Problem', {
    title: Sequelize.STRING,
    description: Sequelize.STRING
  });

  return Problem;
};