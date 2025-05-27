import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export async function POST(req) {
  const { login, password } = await req.json();

  try {
    // 1. Поиск администратора
    const admin = await prisma.admin.findUnique({
      where: { login, isActive: true }
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Неверные учетные данные' },
        { status: 401 }
      );
    }

    // 2. Проверка пароля
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: 'Неверные учетные данные' },
        { status: 401 }
      );
    }

    // 3. Генерация и отправка кода (если есть chatId)
    if (admin.chatId) {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      await prisma.admin.update({
        where: { id: admin.id },
        data: {
          verifyCode: code,
          codeExpires: new Date(Date.now() + 300000) // 5 минут
        }
      });
      // Отправка в Telegram
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: admin.chatId,
          text: `Ваш код подтверждения: ${code}\nКод действителен 5 минут.`
        })
      });

      return NextResponse.json({
        message: 'Код подтверждения отправлен в Telegram',
        requires2FA: true,
        adminId: admin.id
      });
    }

    // 4. Если 2FA не требуется - сразу выдаем токен
    const token = jwt.sign(
      { id: admin.id, login: admin.login },
      JWT_SECRET,
      { expiresIn: '30m' }
    );

    return NextResponse.json({ token });

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}