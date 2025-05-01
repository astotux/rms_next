'use client'
import { useState } from 'react'

export default function RequestForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Отправка...')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('phone', phone)
    if (file) formData.append('file', file)

    const res = await fetch('/api/send-request', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      setStatus('Заявка отправлена!')
      setName('')
      setPhone('')
      setFile(null)
    } else {
      setStatus('Ошибка отправки')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4">
      <input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="tel"
        placeholder="Телефон"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Отправить
      </button>
      <p className="mt-2">{status}</p>
    </form>
  )
}
