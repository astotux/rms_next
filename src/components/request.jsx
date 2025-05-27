'use client'
import { useState, useEffect } from 'react'
import { IMaskInput } from 'react-imask'

export default function RequestForm() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('')
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (status) {
      setIsVisible(true)
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Отправка...')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('phone', phone)

    const res = await fetch('../api/send-request', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      setStatus('Заявка отправлена!')
      setName('')
      setPhone('')
    } else {
      setStatus('Ошибка отправки')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="tasklist-card"
      style={{ position: 'relative' }}
      itemScope=""
      itemType="https://schema.org/ContactPoint"
    >
      <p className="tasklist-title">Оставьте заявку на консультацию</p>
      <div className="inputs-cont">
        <div className="input-cont">
          <label htmlFor="name">Имя</label>
          <input
            className="name-input"
            id="name"
            name="name"
            placeholder="Иван ..."
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-cont">
          <label htmlFor="phone">Телефон</label>
          <IMaskInput
            mask="+7 (000) 000-00-00"
            value={phone}
            onAccept={(value) => setPhone(value)}
            className="phone-input"
            id="phone"
            name="phone"
            type="tel"
            placeholder="+7 (___) ___-__-__"
            required
          />
        </div>
      </div>
      <button className="tasklist-button" type="submit">
        <img
          alt="Оставить заявку на консультацию"
          className="tasklist-icon"
          src="/images/icons/tasklists.svg"
        />
        <span>Отправить заявку</span>
      </button>
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
      <div className={`tasklist-status ${isVisible ? 'visible' : ''}`}>
        {status}
      </div>
    </form>
  )
}
