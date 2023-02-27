'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('videos', [
      {
        id: 'facade01-0000-4000-a000-000000000000',
        creatorId: 'facade01-0000-4000-a000-000000000000',
        title: 'Kratos has big axe',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade02-0000-4000-a000-000000000000',
        creatorId: 'facade01-0000-4000-a000-000000000000',
        title: 'Kratos has big axe 2',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=1Q8fG0TtVAZ',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade03-0000-4000-a000-000000000000',
        creatorId: 'facade01-0000-4000-a000-000000000000',
        title: 'Kratos has big axe 3',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=1Q8fG0TtVA1',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade04-0000-4000-a000-000000000000',
        creatorId: 'facade01-0000-4000-a000-000000000000',
        title: 'Kratos has big axe 4',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=1Q8fG0TtVA2',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade05-0000-4000-a000-000000000000',
        creatorId: 'facade01-0000-4000-a000-000000000000',
        title: 'Kratos has big axe 5',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=1Q8fG0TtVA3',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'facade06-0000-4000-a000-000000000000',
        creatorId: 'facade02-0000-4000-a000-000000000000',
        title: 'Kratos has big axe 6',
        description: 'This video shows how Kratos uses his axe',
        url: 'https://www.youtube.com/watch?v=1Q8fG0TtVA4',
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
