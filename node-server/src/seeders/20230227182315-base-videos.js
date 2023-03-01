'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('videos', [
      {
        id: 'facade01-0000-4000-a000-000000000000',
        creatorId: 'facade01-0000-4000-a000-000000000000',
        title: 'Dross Video 1',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=-USeILTeqDU',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade02-0000-4000-a000-000000000000',
        creatorId: 'facade01-0000-4000-a000-000000000000',
        title: 'Dross Video 2',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=lrLZUkSL79A',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade03-0000-4000-a000-000000000000',
        creatorId: 'facade01-0000-4000-a000-000000000000',
        title: 'Dross Video 3',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=U_phwCcoqCI',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade04-0000-4000-a000-000000000000',
        creatorId: 'facade01-0000-4000-a000-000000000000',
        title: 'Dross Video 4',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=PdkMDSR0W9Y',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade05-0000-4000-a000-000000000000',
        creatorId: 'facade01-0000-4000-a000-000000000000',
        title: 'Dross Video 5',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=3rPP6GDBoaA',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade06-0000-4000-a000-000000000000',
        creatorId: 'facade02-0000-4000-a000-000000000000',
        title: 'Dross Video 6',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=AwmEFzwDmhU',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('videos', null, {})
  },
}
