const seedUsers = require('./user-seeds');
//const seedComments = require('./comment-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----Database Synced----');
    await seedUsers();
    console.log('-Users seeded--');
   // await seedComments();
   // console.log('----Comments seeded---');

    process.exit(0);
};

seedAll();