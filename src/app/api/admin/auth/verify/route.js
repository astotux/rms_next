import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const { adminId, code } = await req.json();

  try {
    // 1. Получаем администратора с кодом
    const admin = await prisma.admin.findUnique({
      where: { id: Number(adminId) }
    });

    // 2. Проверяем код
    if (!admin || !admin.verifyCode || admin.verifyCode !== code) {
      return NextResponse.json(
        { error: 'Неверный код подтверждения' },
        { status: 401 }
      );
    }

    // 3. Проверяем срок действия
    if (new Date() > admin.codeExpires) {
      await prisma.admin.update({
        where: { id: Number(adminId) },
        data: { verifyCode: null, codeExpires: null }
      });
      return NextResponse.json(
        { error: 'Код подтверждения истек' },
        { status: 401 }
      );
    }

    // 4. Генерация токена и очистка кода
    const token = jwt.sign(
      { id: admin.id, login: admin.login },
      JWT_SECRET,
      { expiresIn: '30m' }
    );

    await prisma.admin.update({
      where: { id: Number(adminId) },
      data: { verifyCode: null, codeExpires: null }
    });

    return NextResponse.json({ token });

  } catch (error) {
    console.error('Verify error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}