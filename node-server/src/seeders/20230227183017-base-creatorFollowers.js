'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('creator_followers', [
      {
        creatorId: 'facade01-0000-4000-a000-000000000000',
        followerId: 'facade02-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade01-0000-4000-a000-000000000000',
        followerId: 'facade03-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade01-0000-4000-a000-000000000000',
        followerId: 'facade04-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade01-0000-4000-a000-000000000000',
        followerId: 'facade05-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade02-0000-4000-a000-000000000000',
        followerId: 'facade01-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade03-0000-4000-a000-000000000000',
        followerId: 'facade01-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade04-0000-4000-a000-000000000000',
        followerId: 'facade01-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade05-0000-4000-a000-000000000000',
        followerId: 'facade01-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('creator_followers', null, {})
  },
}
