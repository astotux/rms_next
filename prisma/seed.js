const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {

    // await prisma.completionDetail.deleteMany()
    // await prisma.completion.deleteMany()
    // await prisma.project.deleteMany()
    // await prisma.wallMaterial.deleteMany()
    

  const brick = await prisma.wallMaterial.create({
    data: { name: 'Арболит' },
  })

  const project = await prisma.project.create({
    data: {
      name: 'Дом "Коробка"',
      width: 9,
      length: 11,
      floors: 2,
      area: 110.5,
      rooms: 5,
      wallMaterialId: brick.id,
      completions: {
        create: [
          {
            completionType  : 'Базовая',
            price: 4000000,
            details: {
              create: [
                { name: 'Стены', value: 'Газобетон 300 мм' },
                { name: 'Крыша', value: 'Металлочерепица' },
                { name: 'Окна', value: 'ПВХ двухкамерные' },
              ],
            },
          },
          {
            completionType: 'Стандарт',
            price: 7000000,
            details: {
              create: [
                { name: 'Стены', value: 'Газобетон + утепление' },
                { name: 'Крыша', value: 'Гибкая черепица' },
                { name: 'Отопление', value: 'Электрокотел' },
                { name: 'Вода', value: 'Скважина + насос' },
              ],
            },
          },
          {
            completionType: 'Премиум',
            price: 10000000,
            details: {
              create: [
                { name: 'Стены', value: 'Кирпич + утепление' },
                { name: 'Крыша', value: 'Натуральная черепица' },
                { name: 'Отопление', value: 'Теплый пол' },
                { name: 'Электрика', value: 'Система умного дома' },
                { name: 'Канализация', value: 'Септик' },
              ],
            },
          },
        ],
      },
    },
    include: {
      completions: {
        include: {
          details: true,
        },
      },
    },
  })

  console.log('✅ Данные добавлены:', project.name)
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect())
