'use strict'

const crypto = require('crypto')
const bcrypt = require('bcrypt')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('creators', [
      {
        id: 'facade01-0000-4000-a000-000000000000',
        name: 'John Doe',
        type: 'student',
        photo: 'https://i.pravatar.cc/200?u=nico',
        email: 'johndoe@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        secret: crypto.randomBytes(64).toString('base64'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade02-0000-4000-a000-000000000000',
        name: 'John Doe 2',
        type: 'student',
        photo: 'https://i.pravatar.cc/200?u=Manuel',
        email: 'johndoe2@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        secret: crypto.randomBytes(64).toString('base64'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade03-0000-4000-a000-000000000000',
        name: 'John Doe 3',
        type: 'student',
        photo: 'https://i.pravatar.cc/200?u=Peter',
        email: 'johndoe3@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        secret: crypto.randomBytes(64).toString('base64'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade04-0000-4000-a000-000000000000',
        name: 'John Doe 4',
        type: 'student',
        photo: 'https://i.pravatar.cc/200?u=Cersei',
        email: 'johndoe4@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        secret: crypto.randomBytes(64).toString('base64'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade05-0000-4000-a000-000000000000',
        name: 'John Doe 5',
        type: 'student',
        photo: 'https://i.pravatar.cc/200?u=Tyrion',
        email: 'johndoe5@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        secret: crypto.randomBytes(64).toString('base64'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('creators', null, {})
  },
}
