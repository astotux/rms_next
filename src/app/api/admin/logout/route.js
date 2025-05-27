import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { message: 'Вы успешно вышли из системы' },
    { status: 200 }
  );
  
  // Очищаем куки
  response.cookies.set('adminToken', '', {
    path: '/',
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  return response;
}