// app/api/admin/projects/[id]/route.js
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { saveFile } from '@/lib/file-utils';


export async function GET(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        images: {},
        wallMaterial: true,
        completions: {
          orderBy: { price: 'asc' },
          include: { details: true },
        },
      }
    });
    
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch project', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    const data = await request.json();
    const project = await prisma.project.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        width: Number(data.width),
        length: Number(data.length),
        floors: data.floors,
        area: Number(data.area),
        rooms: Number(data.rooms),
        wallMaterialId: Number(data.wallMaterialId)
      }
    });
    
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update project', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete project', details: error.message },
      { status: 500 }
    );
  }
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