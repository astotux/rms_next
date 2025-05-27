import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(_, { params }) {
  await prisma.wallMaterial.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}

export async function PUT(req, { params }) {
  const data = await req.json();
  const material = await prisma.wallMaterial.update({
    where: { id: Number(params.id) },
    data,
  });
  return NextResponse.json(material);
}
