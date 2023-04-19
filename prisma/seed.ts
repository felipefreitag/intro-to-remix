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
      imageUrl: 'https://source.unsplash.com/random/250×250/?dog',
    },
    {
      name: 'Bolinha',
      email: 'bolinha@dog.com',
      imageUrl: 'https://source.unsplash.com/random/250×250/?dog',
    },
    {
      name: 'Caju',
      email: 'caju@dog.com',
      imageUrl: 'https://source.unsplash.com/random/250×250/?dog',
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
