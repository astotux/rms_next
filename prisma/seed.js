const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Очистка существующих данных
  // await prisma.completionDetail.deleteMany();
  // await prisma.completion.deleteMany();
  // await prisma.projectImage.deleteMany();
  // await prisma.project.deleteMany();
  // await prisma.wallMaterial.deleteMany();

  // Получаем ID созданных материалов
  const wallMaterials = await prisma.wallMaterial.findMany();

  // Создаем проекты домов
  const projects = [
    {
      name: 'Дом "Коробка 4"',
      width: 9,
      length: 11,
      floors: "2",
      area: 110.5,
      rooms: 5,
      wallMaterialId: wallMaterials[0].id, // Арболит
      images: [
        '/images/progres/10x10.jpg',
        '/images/progres/10x10.jpg'
      ],
      completions: [
        {
          type: 'Базовая',
          price: 4000000,
          details: [
            { name: 'Стены', value: 'Арболит 300 мм' },
            { name: 'Крыша', value: 'Металлочерепица' }
          ]
        },
        {
          type: 'Стандарт',
          price: 7000000,
          details: [
            { name: 'Стены', value: 'Арболит + утепление' },
            { name: 'Крыша', value: 'Гибкая черепица' }
          ]
        }
      ]
    },
    {
      name: 'Дом "Уютный 4"',
      width: 10,
      length: 12,
      floors: "1",
      area: 95.3,
      rooms: 4,
      wallMaterialId: wallMaterials[1].id, // Газобетон
      images: [
        '/images/progres/1_etaj.jpg',
        '/images/progres/1_etaj.jpg'
      ],
      completions: [
        {
          type: 'Базовая',
          price: 3500000,
          details: [
            { name: 'Стены', value: 'Газобетон 400 мм' },
            { name: 'Крыша', value: 'Ондулин' }
          ]
        },
        {
          type: 'Премиум',
          price: 8500000,
          details: [
            { name: 'Стены', value: 'Газобетон + кирпич' },
            { name: 'Крыша', value: 'Натуральная черепица' }
          ]
        }
      ]
    },
    {
      name: 'Дом "Престиж 4"',
      width: 12,
      length: 15,
      floors: "3",
      area: 210.8,
      rooms: 7,
      wallMaterialId: wallMaterials[2].id, // Кирпич
      images: [
        '/images/progres/2_etaj.jpg',
        '/images/progres/1_etaj.jpg'
      ],
      completions: [
        {
          type: 'Стандарт',
          price: 12000000,
          details: [
            { name: 'Стены', value: 'Кирпич 510 мм' },
            { name: 'Крыша', value: 'Металлочерепица' }
          ]
        },
        {
          type: 'Премиум',
          price: 18000000,
          details: [
            { name: 'Стены', value: 'Кирпич + утепление' },
            { name: 'Крыша', value: 'Медная кровля' }
          ]
        }
      ]
    }
  ];

  // Создаем проекты в базе
  for (const projectData of projects) {
    const project = await prisma.project.create({
      data: {
        name: projectData.name,
        width: projectData.width,
        length: projectData.length,
        floors: projectData.floors,
        area: projectData.area,
        rooms: projectData.rooms,
        wallMaterialId: projectData.wallMaterialId,
        images: {
          create: projectData.images.map(url => ({ url }))
        },
        completions: {
          create: projectData.completions.map(completion => ({
            completionType: completion.type,
            price: completion.price,
            details: {
              create: completion.details
            }
          }))
        }
      },
      include: {
        images: true,
        completions: {
          include: {
            details: true
          }
        }
      }
    });

    console.log(`✅ Создан проект: ${project.name}`);
    console.log(`   Изображения: ${project.images.length}`);
    console.log(`   Комплектации: ${project.completions.length}`);
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });