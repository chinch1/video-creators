'use strict'

const crypto = require('crypto')

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('creators', [
      {
        id: 'facade01-0000-4000-a000-000000000000',
        name: 'John Doe',
        type: 'student',
        photo: 'https://picsum.photos/200/300',
        email: 'johndoe@gmail.com',
        password: '123456',
        secret: crypto.randomBytes(64).toString('base64'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade02-0000-4000-a000-000000000000',
        name: 'John Doe 2',
        type: 'student',
        photo: 'https://picsum.photos/200/300',
        email: 'johndoe2@gmail.com',
        password: '1234567',
        secret: crypto.randomBytes(64).toString('base64'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade03-0000-4000-a000-000000000000',
        name: 'John Doe 3',
        type: 'student',
        photo: 'https://picsum.photos/200/300',
        email: 'johndoe3@gmail.com',
        password: '1234568',
        secret: crypto.randomBytes(64).toString('base64'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade04-0000-4000-a000-000000000000',
        name: 'John Doe 4',
        type: 'student',
        photo: 'https://picsum.photos/200/300',
        email: 'johndoe4@gmail.com',
        password: '1234569',
        secret: crypto.randomBytes(64).toString('base64'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade05-0000-4000-a000-000000000000',
        name: 'John Doe 5',
        type: 'student',
        photo: 'https://picsum.photos/200/300',
        email: 'johndoe5@gmail.com',
        password: '12345610',
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
