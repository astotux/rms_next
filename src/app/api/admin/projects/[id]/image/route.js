// app/api/admin/projects/[id]/images/route.js
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { saveFile } from '@/lib/file-utils';

export async function POST(req, { params }) {
  try {
    const id = parseInt(params.id);
    const formData = await req.formData();
    const imageFile = formData.get('image');

    if (!imageFile) {
      return NextResponse.json(
        { error: 'Файл изображения не предоставлен' },
        { status: 400 }
      );
    }

    // Сохраняем файл
    const { url } = await saveFile(imageFile);

    // Сохраняем в базу данных
    const image = await prisma.projectImage.create({
      data: {
        url,
        projectId: id
      }
    });

    return NextResponse.json(image);
  } catch (error) {
    console.error('Ошибка загрузки изображения:', error);
    return NextResponse.json(
      { error: 'Ошибка загрузки изображения' },
      { status: 500 }
    );
  }
}
