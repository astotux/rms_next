import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { saveFile } from '@/lib/file-utils';

export async function GET() {
  const houses = await prisma.builtHouse.findMany();
  return NextResponse.json(houses);
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    
    // Получаем данные из формы
    const title = formData.get('title');
    const description = formData.get('description');
    const latitude = parseFloat(formData.get('latitude'));
    const longitude = parseFloat(formData.get('longitude'));
    const imageFile = formData.get('image');

    // Валидация обязательных полей
    if (!title || !latitude || !longitude) {
      return NextResponse.json(
        { error: 'Title, latitude and longitude are required' },
        { status: 400 }
      );
    }

    let imageUrl = '';
    
    // Обрабатываем изображение, если оно есть
    if (imageFile && imageFile.size > 0) {
      const { url } = await saveFile(imageFile, 'houses');
      imageUrl = url;
    }

    // Создаем запись в базе данных
    const house = await prisma.builtHouse.create({
      data: {
        title,
        description,
        latitude,
        longitude,
        image: imageUrl
      }
    });

    return NextResponse.json(house, { status: 201 });

  } catch (error) {
    console.error('Error creating built house:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}