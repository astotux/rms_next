import { NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const completions = await prisma.completion.findMany({
      where: { projectId: Number(params.id) },
      include: { details: true }
    });
    return NextResponse.json(completions);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch completions' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const incomingData = await request.json();

    // Начинаем транзакцию
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Сначала удаляем все детали комплектаций
      await prisma.completionDetail.deleteMany({
        where: {
          completion: {
            projectId: Number(id)
          }
        }
      });

      // 2. Затем удаляем сами комплектации
      await prisma.completion.deleteMany({
        where: { projectId: Number(id) }
      });

      // 3. Создаем новые комплектации с деталями
      const createdCompletions = [];
      for (const comp of incomingData) {
        const newComp = await prisma.completion.create({
          data: {
            completionType: comp.completionType,
            price: comp.price,
            projectId: Number(id),
            details: {
              create: comp.details?.map(d => ({
                name: d.name,
                value: d.value
              })) || []
            }
          },
          include: { details: true }
        });
        createdCompletions.push(newComp);
      }

      return createdCompletions;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating completions:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update completions',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}