'use client'
import { useState, useEffect } from 'react'
import { IMaskInput } from 'react-imask'

export default function RequestBodyForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [file, setFile] = useState(null)
  const [buttonText, setButtonText] = useState('Отправить заявку')
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setButtonText('Отправка...')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('phone', phone)
    if (file) formData.append('file', file)

    const res = await fetch('../api/send-request', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      setButtonText('Заявка отправлена!')
      setName('')
      setPhone('')
      setFile(null)
    } else {
      setButtonText('Ошибка отправки')
    }

    setTimeout(() => {
      setButtonText('Отправить заявку')
    }, 4000)
  }

  return (
    <form onSubmit={handleSubmit} className="request-form" itemScope itemType="https://schema.org/ContactPoint">
      <div className="inputs-cont">
        <div className="request-input-cont">
          <label>Имя</label>
          <input
            className="name-input request-input"
            id="name"
            name="name"
            placeholder="Иван ..."
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="request-input-cont">
          <label>Телефон</label>
          <IMaskInput
            mask="+7 (000) 000-00-00"
            value={phone}
            onAccept={(value) => setPhone(value)}
            className="phone-input request-input"
            id="phone"
            name="phone"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            required
          />
        </div>

        <div className='file-div'>
          <label className="label-text">Смета или план дома</label>
          <div className="request-input-cont">
            <img src='/images/icons/file.svg' className='img-file' />
            <label htmlFor="file" className="file-input-label"><span className={file ? "file-name-true" : "file-name"}>{file ? file.name : "Файл не выбран (необязательно)"}</span></label>
              <input
                className="file-input-hidden"
                id="file"
                name="file"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            
          </div>
        </div>

        <div className="send-request-cont">
          <button className="send-request button-purple" type="submit">
            <span>{buttonText}</span>
          </button>
        </div>
        {/* Чекбокс с соглашением */}
        <div className="checkbox-cont">
                <input
                  type="checkbox"
                  id="agreement-checkbox"
                  required
                  className="checkbox-input"
                  checked={isAgreementChecked}
                  onChange={(e) => setIsAgreementChecked(e.target.checked)}
                />
                  <label htmlFor="agreement-checkbox" className="checkbox-label">
                    Я согласен с <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="agreement-link">условиями обработки персональных данных</a>
                  </label>
                </div>
      </div>
    </form>
  )
}
