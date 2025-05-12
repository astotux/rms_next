import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PROJECTS_PER_PAGE = 8;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Параметры фильтрации
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minArea = searchParams.get('minArea');
    const maxArea = searchParams.get('maxArea');
    const floors = searchParams.get('floors');
    const rooms = searchParams.get('rooms');
    const page = parseInt(searchParams.get('page')) || 1;
    const perPage = parseInt(searchParams.get('perPage')) || PROJECTS_PER_PAGE;

    // Условия фильтрации
    const where = {
      ...(minPrice || maxPrice ? {
        completions: {
          some: {
            price: {
              ...(minPrice ? { gte: parseInt(minPrice) } : {}),
              ...(maxPrice ? { lte: parseInt(maxPrice) } : {})
            }
          }
        }
      } : {}),
      ...(minArea || maxArea ? {
        area: {
          ...(minArea ? { gte: parseFloat(minArea) } : {}),
          ...(maxArea ? { lte: parseFloat(maxArea) } : {})
        }
      } : {}),
      ...(floors ? { floors } : {}),
      ...(rooms ? { rooms: parseInt(rooms) } : {})
    };

    // Получаем проекты с пагинацией
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where,
        include: {
          wallMaterial: true,
          completions: {
            orderBy: { price: 'asc' }
          },
          images: { take: 1 }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage
      }),
      prisma.project.count({ where })
    ]);

    const totalPages = Math.ceil(totalCount / perPage);

    return Response.json({
      projects,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        perPage
      }
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}