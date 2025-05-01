import { NextResponse } from 'next/server'

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(req) {
  const formData = await req.formData()
  const name = formData.get('name')
  const phone = formData.get('phone')
  const file = formData.get('file')

  const text = `📥 Новая заявка:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}`

  if (file && file.name) {
    const stream = file.stream()
    const buffer = await new Response(stream).arrayBuffer()

    const tgForm = new FormData()
    tgForm.append('chat_id', CHAT_ID)
    tgForm.append('caption', text)
    tgForm.append('document', new Blob([buffer]), file.name)

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: tgForm,
    })
  } else {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    })
  }

  return NextResponse.json({ ok: true })
}
