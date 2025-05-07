import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const houses = await prisma.builtHouse.findMany();

  const formatted = houses.map((house) => ({
    ...house,
    coordinates: [house.latitude, house.longitude],
  }));

  return NextResponse.json(formatted);
}
