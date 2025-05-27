import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { saveFile } from '@/lib/file-utils';

export async function GET() {
  const projects = await prisma.project.findMany({
    include: { wallMaterial: true, completions: true, images: true },
  });
  return NextResponse.json(projects);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    // 1. Получаем JSON-данные проекта
    const projectJson = formData.get('project');
    if (!projectJson) {
      return NextResponse.json(
        { error: 'Данные проекта не предоставлены' },
        { status: 400 }
      );
    }

    const projectData = JSON.parse(projectJson);

    // 2. Создаем проект в транзакции
    const result = await prisma.$transaction(async (tx) => {
      // 2.1. Создаем основной проект
      const project = await tx.project.create({
        data: {
          name: projectData.name,
          description: projectData.description,
          width: projectData.width,
          length: projectData.length,
          floors: projectData.floors,
          area: projectData.area,
          rooms: projectData.rooms,
          wallMaterialId: projectData.wallMaterialId,
        },
      });

      // 2.2. Обрабатываем изображения (если есть)
      const imageFiles = formData.getAll('images');
      if (imageFiles.length > 0) {
        const imagePromises = imageFiles.map(async (file) => {
          if (file.name) { // Проверяем, что это файл
            const { url } = await saveFile(file);
            return tx.projectImage.create({
              data: {
                url,
                projectId: project.id,
              },
            });
          }
        });
        await Promise.all(imagePromises);
      }

      // 2.3. Обрабатываем комплектации (если есть)
      if (projectData.completions?.length > 0) {
        const completionPromises = projectData.completions.map(completion => 
          tx.completion.create({
            data: {
              completionType: completion.completionType,
              price: completion.price,
              projectId: project.id,
              details: {
                create: completion.details.map(detail => ({
                  name: detail.name,
                  value: detail.value,
                })),
              },
            },
          })
        );
        await Promise.all(completionPromises);
      }

      return project;
    });

    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error('Ошибка создания проекта:', error);
    return NextResponse.json(
      { error: 'Ошибка создания проекта' },
      { status: 500 }
    );
  }
}