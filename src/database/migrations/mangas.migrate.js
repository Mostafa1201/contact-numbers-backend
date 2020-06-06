module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('mangas', {
            id : {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            rank : Sequelize.INTEGER,
            score: Sequelize.FLOAT,
            date: Sequelize.STRING,
            showId: Sequelize.INTEGER,
            createdAt : Sequelize.DATE,
            updatedAt : Sequelize.DATE
      });
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('mangas');
    }
  };