import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const materials = await prisma.wallMaterial.findMany();
  return NextResponse.json(materials);
}

export async function POST(req) {
  const data = await req.json();
  const material = await prisma.wallMaterial.create({ data });
  return NextResponse.json(material);
}