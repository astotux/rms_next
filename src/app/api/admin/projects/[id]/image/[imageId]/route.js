// app/api/admin/projects/[id]/image/[imageId]/route.js
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { deleteFile } from '@/lib/file-utils';

export async function DELETE(request, { params }) {
  try {
    const projectId = parseInt(params.id);
    const imageId = parseInt(params.imageId);
    
    if (isNaN(projectId) || isNaN(imageId)) {
      return NextResponse.json({ error: 'Invalid IDs' }, { status: 400 });
    }

    const image = await prisma.projectImage.findUnique({
      where: { id: imageId }
    });

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Удаляем файл
    deleteFile(image.url);
    
    // Удаляем запись из БД
    await prisma.projectImage.delete({
      where: { id: imageId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete image', details: error.message },
      { status: 500 }
    );
  }
}