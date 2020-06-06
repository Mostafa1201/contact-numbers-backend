module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('shows', {
            id : {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name : Sequelize.STRING,
            image: Sequelize.STRING,
            showType: Sequelize.STRING,
            createdAt : Sequelize.DATE,
            updatedAt : Sequelize.DATE,
            deletedAt : Sequelize.DATE,
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('shows');
    }
  };