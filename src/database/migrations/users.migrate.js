module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', {
            id : {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username : Sequelize.STRING,
            password : Sequelize.STRING,
            createdAt : Sequelize.DATE,
            updatedAt : Sequelize.DATE,
            deletedAt : Sequelize.DATE,
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
    }
  };