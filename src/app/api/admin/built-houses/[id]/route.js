import { PrismaClient } from '@prisma/client';
import { saveFile, deleteFile } from '@/lib/file-utils';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  try {
    // Для создания нового дома возвращаем пустой объект
    if (params.id === 'create') {
      return Response.json({
        latitude: 0,
        longitude: 0,
        title: '',
        description: '',
        image: ''
      });
    }

    const house = await prisma.builtHouse.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!house) {
      return Response.json({ error: 'House not found' }, { status: 404 });
    }

    return Response.json({
      ...house,
      latitude: parseFloat(house.latitude),
      longitude: parseFloat(house.longitude)
    });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    
    // Получаем текущий дом для проверки старого изображения
    const currentHouse = await prisma.builtHouse.findUnique({
      where: { id: parseInt(params.id) }
    });

    // Если обновляем изображение и было старое - удаляем его
    if (data.image && currentHouse.image && data.image !== currentHouse.image) {
      deleteFile(currentHouse.image);
    }

    const updatedHouse = await prisma.builtHouse.update({
      where: { id: parseInt(params.id) },
      data: {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        title: data.title,
        description: data.description,
        image: data.image
      }
    });

    return Response.json(updatedHouse);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    const newHouse = await prisma.builtHouse.create({
      data: {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        title: data.title,
        description: data.description,
        image: data.image
      }
    });

    return Response.json(newHouse, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    // Получаем дом перед удалением, чтобы удалить его изображение
    const house = await prisma.builtHouse.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (house?.image) {
      deleteFile(house.image);
    }

    await prisma.builtHouse.delete({
      where: { id: parseInt(params.id) }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}