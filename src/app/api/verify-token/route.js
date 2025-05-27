// app/api/verify-token/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  const { token } = await request.json();
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ valid: true, decoded });
  } catch (err) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}