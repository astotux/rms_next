// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('adminToken')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/not-found', request.url));
    }

    // В Edge Runtime просто пропускаем
    // Реальная проверка будет на сервере
    return NextResponse.next();
  }

  return NextResponse.next();
}