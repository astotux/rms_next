'use client';

import { useEffect, useState } from 'react';
import ProjectSlider from "./slider";
import ProjectGallery from "./projectGallery";
import ShareButton from './shareButton';
import { IMaskInput } from 'react-imask';
import '@/styles/project.css';

export default function ProjectPageClient({ id }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedCompletion, setSelectedCompletion] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [status, setStatus] = useState('Отправить');
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки проекта:', err);
        setLoading(false);
      });
  }, [id]);

  const handleOpenPopup = (completion) => {
    setSelectedCompletion(completion);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setStatus('Отправить');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Отправка...');

    const formDataUply = new FormData()
    formDataUply.append('name', formData.name)
    formDataUply.append('phone', formData.phone)
    formDataUply.append('id_project', project?.id)
    formDataUply.append('comp', selectedCompletion?.completionType)

    // console.log(formData.name, formData.phone, project?.id)

    try {
      const res = await fetch('../api/send-request', {
        method: 'POST',
        body: formDataUply,
      })

      if (res.ok) {
        setStatus('Заявка отправлена!');
        setFormData({ name: '', phone: '' });
      } else {
        setStatus('Ошибка отправки');
      }
    } catch (error) {
      console.log(error);
      setStatus('Ошибка отправки');
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Загрузка...</p>
    </div>
  );
  if (!project) return <p>Проект не найден</p>;

  const { name, description, width, length, floors, area, rooms, wallMaterial, images } = project;

  return (
    <main>
      {showPopup && (
        <div className="popup-overlay">
        <div className="popup-content">
          <button className="popup-close" onClick={handleClosePopup}>×</button>
          
          <div className="popup-layout">
            {/* Левая часть - информация о проекте */}
            <div className="popup-project-info">
              {images.length > 0 && (
                <div className="popup-project-image">
                  <img 
                    src={images[0].url} 
                    alt={`Проект ${name}`} 
                    className="popup-image"
                  />
                </div>
              )}
              
              <div className="popup-project-details">
                <h3 className="popup-project-title">{name}</h3>
                
                <div className="popup-completion-info">
                  <h4>Комплектация: {selectedCompletion?.completionType}</h4>
                  <p className="popup-price">
                    Цена: <strong>от {selectedCompletion?.price.toLocaleString()} ₽</strong>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Правая часть - форма */}
            <div className="popup-form-section">
              <h3 className="popup-form-title">Оставить заявку</h3>
              <p className="popup-form-subtitle">Мы свяжемся с вами для уточнения деталей</p>
              
              <form onSubmit={handleSubmit} className="popup-form">
                <div className="input-cont overlay-input-cont">
                  <label htmlFor="popup-name">Ваше имя</label>
                  <input
                    className='name-input overlay-input'
                    id="popup-name"
                    name="name"
                    type="text"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="input-cont overlay-input-cont">
                  <label htmlFor="popup-phone">Телефон</label>
                  <IMaskInput
                    mask="+7 (000) 000-00-00"
                    className='phone-input overlay-input'
                    id="popup-phone"
                    name="phone"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onAccept={handlePhoneChange}
                    required
                  />
                </div>
      
                
                
                <button type="submit" className="submit-overlay button-purple">
                  <span>{status}</span>
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
              </form>
            </div>
          </div>
        </div>
      </div>
      )}
      <section className="project-card-cont" itemScope itemType="https://schema.org/Product">
        <meta itemProp="name" content={name} />
        <meta itemProp="description" content={description} />
        <meta itemProp="brand" content="РМСтрой" />
        <meta itemProp="category" content="Дом" />

        <ProjectGallery images={images} name={name} />

        <div className="project-info">
          <div className="project-header">
            <h2 itemProp="name">{name}</h2>
            <ShareButton project={project} position='bottom' />
          </div>

          <hr className="mini-line" />

          <div className="price-block">
            <span className="label">от
              <span className="price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="price" content={project.completions[0].price} />
                <meta itemProp="priceCurrency" content="RUB" />
                <span itemProp="price">{project.completions[0].price.toLocaleString()} ₽</span>
              </span>
            </span>
            <span className="credit">с эскроу счетом</span>
          </div>

          <hr className="mini-line" />

          <div className="features">
            <div className="feature">
              <div className="card-icon-cont feature-icon-cont">
                <img alt="Размер дома" src="../images/icons/size.svg" />
              </div>
              <span className="feature-title">Размер<br /><strong itemProp="width">{width}x{length}</strong></span>
            </div>
            <div className="feature">
              <div className="card-icon-cont feature-icon-cont">
                <img alt="Этажей" src="../images/icons/floors.svg" />
              </div>
              <span className="feature-title">Этажи<br /><strong itemProp="numberOfFloors">{floors}</strong></span>
            </div>
            <div className="feature">
              <div className="card-icon-cont feature-icon-cont">
                <img alt="Площадь" src="../images/icons/square.svg" />
              </div>
              <span className="feature-title">Площадь<br /><strong itemProp="floorSize">{area}</strong></span>
            </div>
            <div className="feature">
              <div className="card-icon-cont feature-icon-cont">
                <img alt="Комнаты" src="../images/icons/rooms.svg" />
              </div>
              <span className="feature-title">Комнаты<br /><strong itemProp="numberOfRooms">{rooms}</strong></span>
            </div>
            <div className="feature">
              <div className="card-icon-cont feature-icon-cont">
                <img alt="Материал стен" src="../images/icons/wall.svg" />
              </div>
              <span className="feature-title">Материал стен<br /><strong itemProp="material">{wallMaterial.name}</strong></span>
            </div>
          </div>

          <hr className="mini-line" />

          <div className="description">
            <h3>Описание проекта</h3>
            <p itemProp="description">{description}</p>
          </div>
        </div>
      </section>

      {/* Комплектации */}
      <section className="pricing-section" itemScope itemType="https://schema.org/Product">
        <h2>Комплектация и цены</h2>
        <div className="pricing-cards">
          {project.completions.map((comp, i) => (
            <div className="card" key={i} itemProp="offers" itemScope itemType="https://schema.org/Offer">
              <meta itemProp="price" content={comp.price} />
              <meta itemProp="priceCurrency" content="RUB" />
              <h3>{comp.completionType}<br /><span>от <span itemProp="price">{comp.price.toLocaleString()} ₽</span></span></h3>
              <ul itemProp="description">
                {comp.details.map((detail, j) => (
                  <li key={j}><strong>{detail.name}</strong>: {detail.value}</li>
                ))}
              </ul>
              <div className="tasklist-cont">
                <button 
                  className="tasklist-button copmlectation-button" 
                  type="button"
                  onClick={() => handleOpenPopup(comp)}
                >
                  <img alt="Заявка" className="tasklist-icon" src="../images/icons/tasklists.svg" />
                  <span>Отправить заявку</span>
                </button>
                <p className="note">Оставьте заявку на консультацию.<br /> Мы перезвоним!</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr className='line project-line' />


      <section className="ready-projects">

        <div>
          <meta content="Готовые проекты домов от РМСтрой" itemProp="name" />
          <meta content="Выберите проект дома под ключ с учетом этажности, площади и количества комнат." itemProp="description" />
        </div>
        <div style={{ width: "100%" }}>
          <div className="ready-projects-titles-cont top-title-cont">
            <div className="ready-projects-title-cont title-cont">
              <img alt="Проекты домов" className="title-image" src="../images/icons/folder.svg" />
              <h2 className="ready-projects-title title-top">Готовые проекты домов</h2>
            </div>
            <div className="all-project-cont">
              <a className="all-project-div link-projects" href="/projects"><span>Все проекты домов</span></a>
            </div>
          </div>
          <ProjectSlider />
        </div>
      </section>
    </main>
  );
}
