import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@socaa.local'
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  const passwordHash = await bcrypt.hash('admin123', 10)

  const admin = existing ?? (await prisma.user.create({
    data: {
      email: adminEmail,
      name: 'Admin',
      role: Role.ADMIN,
      passwordHash,
    },
  }))

  const officerUser = await prisma.user.upsert({
    where: { email: 'officer@socaa.local' },
    update: {},
    create: {
      email: 'officer@socaa.local',
      name: 'Jane Officer',
      role: Role.OFFICER,
      passwordHash: await bcrypt.hash('officer123', 10),
      officer: {
        create: {
          specialization: 'Horticulture',
          region: 'Nairobi',
          bio: '10 years experience supporting smallholder farmers.',
        },
      },
    },
    include: { officer: true },
  })

  const maize = await prisma.crop.upsert({
    where: { name: 'Maize' },
    update: {},
    create: { name: 'Maize', description: 'Staple cereal crop' },
  })
  const beans = await prisma.crop.upsert({
    where: { name: 'Beans' },
    update: {},
    create: { name: 'Beans', description: 'Protein-rich legume' },
  })

  await prisma.advisory.createMany({
    data: [
      {
        title: 'Maize planting guide',
        content: 'Plant at onset of rains; spacing 75x25 cm; apply DAP at planting.',
        authorId: officerUser.id,
        cropId: maize.id,
      },
      {
        title: 'Bean pest management',
        content: 'Scout weekly; use IPM for aphids and bean fly; rotate crops.',
        authorId: officerUser.id,
        cropId: beans.id,
      },
    ],
    skipDuplicates: true,
  })

  await prisma.marketRate.createMany({
    data: [
      { cropId: maize.id, location: 'Nairobi', pricePerKg: 0.45 },
      { cropId: beans.id, location: 'Nakuru', pricePerKg: 0.95 },
    ],
  })

  console.log('Seed completed. Admin login: admin@socaa.local / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })