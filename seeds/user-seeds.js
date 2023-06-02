const { User } = require('../models');

const userData = [
    {
        name: 'John',
        email: 'john123@gmail.com',
        password: 'password123'
    },
    {
        name: "Lernantino",
        email: "lernantino@gmail.com",
        password: "password12345"
      },
      {
        name: "Amiko",
        email: "amiko2k20@aol.com",
        password: "password12345"
      },
      {
        name: "Jordan",
        email: "jordan99@msn.com",
        password: "password12345"
      },
      {
        name: "Blake",
        email: "the_blake@yahoo.com",
        password: "password12345"
      }
];

const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;