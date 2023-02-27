'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('liked_videos', [
      {
        creatorId: 'facade01-0000-4000-a000-000000000000',
        videoId: 'facade01-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade01-0000-4000-a000-000000000000',
        videoId: 'facade02-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade01-0000-4000-a000-000000000000',
        videoId: 'facade03-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade01-0000-4000-a000-000000000000',
        videoId: 'facade04-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade01-0000-4000-a000-000000000000',
        videoId: 'facade05-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade01-0000-4000-a000-000000000000',
        videoId: 'facade06-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade02-0000-4000-a000-000000000000',
        videoId: 'facade01-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade03-0000-4000-a000-000000000000',
        videoId: 'facade01-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade04-0000-4000-a000-000000000000',
        videoId: 'facade01-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        creatorId: 'facade05-0000-4000-a000-000000000000',
        videoId: 'facade01-0000-4000-a000-000000000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('liked_videos', null, {})
  },
}
