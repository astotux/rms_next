// app/api/getProject/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { floors, size, area, rooms } = body;

    const where = {};

    // 1. Фильтр по этажности (floors - String, "как есть")
    if (floors && floors !== '-') {
      where.floors = floors; // "1, с мансардой" → ищем точное совпадение
    }

    // 2. Фильтр по размерам (width/length - Int)
    if (size && size !== '-') {
      const [width, length] = size.split('x').map(Number);
      where.OR = [
        { 
          width: { gte: width - 2, lte: width + 2 }, // ±2 метра допуск
          length: { gte: length - 2, lte: length + 2 }
        },
        { 
          width: { gte: length - 2, lte: length + 2 }, // Обратный вариант (8x10 → 10x8)
          length: { gte: width - 2, lte: width + 2 }
        }
      ];
    }

    // 3. Фильтр по площади (area - Float)
    if (area && area !== '-') {
      if (area.includes('-')) { // Диапазон (100-150)
        const [min, max] = area.split('-').map(parseFloat);
        where.area = { gte: min, lte: max };
      } else if (area === '100') { // "до 100 м²"
        where.area = { lte: 100 };
      } else if (area === '200') { // "более 200 м²"
        where.area = { gte: 200 };
      } else { // Точное значение (±10 м²)
        const value = parseFloat(area);
        where.area = { gte: value - 10, lte: value + 10 };
      }
    }

    // 4. Фильтр по комнатам (rooms - Int)
    if (rooms && rooms !== '-') {
      if (rooms.includes('-')) { // Диапазон (3-5)
        const [min, max] = rooms.split('-').map(Number);
        where.rooms = { gte: min, lte: max };
      } else { // Точное значение (±1 комната)
        const value = Number(rooms);
        where.rooms = { gte: value - 1, lte: value + 1 };
      }
    }

    // Поиск проектов
    const project = await prisma.project.findFirst({
      where,
      include: {
        images: true,
        completions: { include: { details: true } },
        wallMaterial: true
      },
    });

    return NextResponse.json({
      project
    });

  } catch (error) {
    console.error('[getProject]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}