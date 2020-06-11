let bcrypt = require('bcrypt');
module.exports = {
    up: async(queryInterface, Sequelize) => {
        let hash1 = await bcrypt.hash('user1' , 10);
        let hash2 = await bcrypt.hash('user2' , 10);

        return queryInterface.bulkInsert('users', [
            {
                username: 'user1',
                password: hash1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                username: 'user2',
                password: hash2,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        
        ]);
    },
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
    }
  };