import { PrismaClient } from '@prisma/client';
import { saveFile, deleteFile } from '@/lib/file-utils';

const prisma = new PrismaClient();

export async function POST(request, { params }) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    
    if (!file) {
      return Response.json({ error: 'No image provided' }, { status: 400 });
    }

    // Получаем текущий дом для проверки старого изображения
    const currentHouse = await prisma.builtHouse.findUnique({
      where: { id: parseInt(params.id) }
    });

    // Сохраняем новый файл
    const { url: imageUrl } = await saveFile(file, 'houses');

    // Удаляем старое изображение, если оно было
    if (currentHouse?.image) {
      deleteFile(currentHouse.image);
    }

    // Обновляем запись в базе данных
    await prisma.builtHouse.update({
      where: { id: parseInt(params.id) },
      data: { image: imageUrl }
    });

    return Response.json({ imageUrl });
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}