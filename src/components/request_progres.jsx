'use client'
import { useState, useEffect } from 'react'
import { IMaskInput } from 'react-imask'

export default function RequestProgresForm(id_project) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const [buttonText, setButtonText] = useState('Отправить заявку')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setButtonText('Отправка...')
    const formData = new FormData()
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('id_project', id_project.id_project)
    const res = await fetch('../api/send-request', {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      setButtonText('Заявка отправлена!')
      setName('')
      setPhone('')
    } else {
      setButtonText('Ошибка отправки')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="request-form request-form-project" itemScope itemType="https://schema.org/ContactPoint">
      <div className="inputs-cont">
        <div>
        <p className='request-form-title-project'>Ваш проект подобран!</p>
        <p className='request-form-text-project'>Отправьте заявку на косультацию, чтобы обсудить дели проекта</p>
        </div>
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
        <input value={id_project} name='id_project' type='hidden' />
        <div className="send-request-cont">
          <button className="send-request button-purple" type="submit">
            <span>{buttonText}</span>
          </button>
        </div>
        {/* Чекбокс с соглашением */}
        <div className="checkbox-cont">
                <input
                  type="checkbox"
                  id="agreement-checkbox-3"
                  required
                  className="checkbox-input"
                  checked={isAgreementChecked}
                  onChange={(e) => setIsAgreementChecked(e.target.checked)}
                />
                  <label htmlFor="agreement-checkbox-3" className="checkbox-label">
                    Я согласен с <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="agreement-link">условиями обработки персональных данных</a>
                  </label>
                </div>
      </div>
    </form>
  )
}
