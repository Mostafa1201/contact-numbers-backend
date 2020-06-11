module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('contacts', {
            id : {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name : Sequelize.STRING,
            phone: Sequelize.STRING,
            address: Sequelize.STRING,
            notes: Sequelize.STRING,
            createdAt : Sequelize.DATE,
            updatedAt : Sequelize.DATE,
            deletedAt : Sequelize.DATE,
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('contacts');
    }
  };