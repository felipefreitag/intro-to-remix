import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

async function seed() {
  await Promise.all(
    getDogs().map((dog) => {
      return db.user.create({ data: dog })
    }),
  )
  await Promise.all(
    getBarks().map((bark) => {
      return db.bark.create({ data: bark })
    }),
  )
}

seed()

function getDogs() {
  return [
    {
      name: 'Pistache',
      email: 'pistache@dog.com',
      imageUrl: 'https://i.ibb.co/mbpsM98/IMG-20221029-065935613.jpg',
      passwordHash:
        '$2a$04$vrndGifAjWIpW.oSIACmLuIOmPvkOfZDUVeih/Bi3nmEg2gs9l6mK',
    },
    {
      name: 'Bolinha',
      email: 'bolinha@dog.com',
      imageUrl: 'https://i.ibb.co/Gsft7WP/dog1.jpg',
      passwordHash:
        '$2a$04$vrndGifAjWIpW.oSIACmLuIOmPvkOfZDUVeih/Bi3nmEg2gs9l6mK',
    },
    {
      name: 'Caju',
      email: 'caju@dog.com',
      imageUrl: 'https://i.ibb.co/qyZVCG4/dog2.jpg',
      passwordHash:
        '$2a$04$vrndGifAjWIpW.oSIACmLuIOmPvkOfZDUVeih/Bi3nmEg2gs9l6mK',
    },
  ]
}

function getBarks() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      authorId: 1,
      content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
    },
    {
      authorId: 2,
      content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
    },
    {
      authorId: 3,
      content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
    },
  ]
}
