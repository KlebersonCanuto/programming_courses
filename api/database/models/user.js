module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    emailConfirmed: Sequelize.BOOLEAN,
    profileImageURL: Sequelize.STRING,
    admin: Sequelize.BOOLEAN
  });

  return User;
};