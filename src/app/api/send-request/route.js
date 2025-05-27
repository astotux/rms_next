import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const SITE_URL = process.env.SITE_URL

export async function POST(req) {
  const formData = await req.formData()
  const name = formData.get('name')
  const phone = formData.get('phone')
  const file = formData.get('file')
  const idProject = formData.get('id_project')
  const comp = formData.get('comp')

  let text = `📥 Новая заявка:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}`

  if (idProject) {
    const project = await prisma.project.findUnique({
      where: { id: Number(idProject) },
      select: { name: true },
    })

    if (project) {
      text += `\n🏠 Выбранный дом: [${project.name}](${SITE_URL}/projects/${idProject})`
    }
  }

  if (comp) {
    text += `\n🏘 Выбранная комплектация: ${comp}`
  }

  // Получаем всех активных админов с chatId
  const admins = await prisma.admin.findMany({
    where: {
      isActive: true,
      chatId: { not: null },
    },
    select: { chatId: true },
  })

  for (const admin of admins) {
    const chatId = admin.chatId

    if (file && file.name) {
      const stream = file.stream()
      const buffer = await new Response(stream).arrayBuffer()

      const tgForm = new FormData()
      tgForm.append('chat_id', chatId)
      tgForm.append('caption', text)
      tgForm.append('parse_mode', 'Markdown')
      tgForm.append('document', new Blob([buffer]), file.name)

      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
        method: 'POST',
        body: tgForm,
      })
    } else {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
        }),
      })
    }
  }

  return NextResponse.json({ ok: true })
}
