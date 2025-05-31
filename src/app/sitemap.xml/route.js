// src/app/sitemap.xml/route.ts
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const baseUrl = process.env.SITE_URL

  // Получаем все проекты из базы
  const projects = await prisma.project.findMany({ select: { id: true } })

  // Статические страницы
  const staticPages = [
    '',
    'projects',
    'privacy-policy',
    'posselhoz',
    'sber',
    'vtb',
  ]

  // Генерация XML для каждой страницы
  const urls = [
    ...staticPages.map(
      (page) => `
  <url>
    <loc>${baseUrl}/${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    ),
    ...projects.map(
      (project) => `
  <url>
    <loc>${baseUrl}/projects/${project.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    ),
  ]

  // Финальный XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
