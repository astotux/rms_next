'use client'

import { useState, useEffect } from 'react';
import RequestProgresForm from './request_progres';
import ShareButton from './shareButton';
import Image from 'next/image';
import Link from 'next/link';

const questions = [
  { key: 'floors', title: 'Выберите этажность дома:', options: [ { label: '1 этаж', value: '1', img: '1_etaj.png' }, { label: '2 этажа', value: '2', img: '2_etaj.png' }, { label: '3 этажа', value: '3', img: '3_etaj.png' }, { label: '1, с мансардой', value: '1 + мансарда', img: '1+_etaj.png' }, { label: '2, с мансардой', value: '2 + мансарда', img: '2+_etaj.png' },  { label: 'Пропустить', value: '-', img: 'another.png' }, ] },
  { key: 'size', title: 'Выберите размеры дома (приблизительно):', options: [ { label: '8x8 м', value: '8x8', img: '8x8.png' }, { label: '10x10 м', value: '10x10', img: '10x10.png' }, { label: '12x12 м', value: '12x12', img: '12x12.png' }, { label: '14x14 м', value: '14x14', img: '14x14.png' }, { label: '16x16 м', value: '16x16', img: '16x16.png' }, { label: 'Пропустить', value: '-', img: 'another.png' }, ] },
  { key: 'area', title: 'Выберите площадь дома:', options: [ { label: 'до 100 м²', value: '100', img: '10x10.png' }, { label: '100 - 150 м²', value: '100-150', img: '12x12.png' },  { label: '150 - 200 м²', value: '150-200', img: '14x14.png' },  { label: 'более 200 м²', value: '200', img: '16x16.png' }, { label: 'Пропустить', value: '-', img: 'another.png' },] },
  { key: 'rooms', title: 'Выберите количество комнат:', options: [ { label: 'до 6 комнат', value: '6', img: '1_etaj.png' }, { label: '6-8 комнат', value: '6-8', img: '8x8.png' }, { label: '8-11 комнат', value: '8-11', img: '14x14.png' }, { label: '11-14 комнат', value: '11-14', img: '12x12.png' }, { label: 'более 14 комнат', value: '14', img: '3_etaj.png' }, { label: 'Другое', value: '-', img: 'another.png' }, ] },
];

export default function ProjectSelector() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [project, setProject] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Calculate progress percentage
  const progressPercentage = ((currentStep+1) / questions.length) * 100;

  const handleSelect = (value) => {
    const updated = { ...selections, [questions[currentStep].key]: value };
    setSelections(updated);
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setShowForm(true);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch('/api/getProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selections),
      });
      const data = await res.json();
      if (data.project !== null) {
        setProject(data.project);
      }
    };

    if (Object.keys(selections).length > 0) {
      fetchProject();
    }
  }, [selections]);

  const currentQuestion = questions[currentStep];

  return (
    <div className="project-selection-cont">
        <div className="project-card ready-project">
        <div className='project-img-conrainer'>
          <img className='project-card-img' src={project ? project.images?.[0]?.url : '/images/progres/another.png'} alt={project ? project.name : ''} />
        </div>
          <div>
              <h3 className="card-title">{project ? project.name : 'Подбор проекта'}</h3>
              <p className="card-und-title">от <span className="card-price">{project ? project.completions?.[0]?.price?.toLocaleString() : '0'} ₽</span></p>
          </div>
          <ul>
              <li>
                  <div className="card-icon-cont">
                      <img alt="Размер дома в метрах" src="images/icons/size.svg" />
                  </div>
                  <div>
                      <p className="card-parametrs-name">Размер</p>
                      <p className="card-parametrs">{project ? project.width : ''}{project ? 'x' : ''}{project ? project.length : ''}</p>
                  </div>
              </li>
              <li>
                  <div className="card-icon-cont">
                      <img alt="Количество этажей" src="images/icons/floors.svg" />
                  </div>
                  <div>
                      <p className="card-parametrs-name">Этажи</p>
                      <p className="card-parametrs">{project ? project.floors : ''}</p>
                  </div>
              </li>
              <li>
                  <div className="card-icon-cont">
                      <img alt="Общая площадь дома" src="images/icons/square.svg" />
                  </div>
                  <div>
                      <p className="card-parametrs-name">Площадь</p>
                      <p className="card-parametrs">{project ? project.area : ''}</p>
                  </div>
              </li>
              <li>
                  <div className="card-icon-cont">
                      <img alt="Количество комнат" src="images/icons/rooms.svg" />
                  </div>
                  <div>
                      <p className="card-parametrs-name">Комнаты</p>
                      <p className="card-parametrs">{project ? project.rooms : ''}</p>
                  </div>
              </li>
          </ul>
          <div className="card-button-cont">
            <ShareButton project={project} />
            <Link href={`/projects/${project ? project.id : ''}`} className="more-button button-purple">
              <span>Подробнее</span>
            </Link>
          </div>
        </div>
        {showForm && (
          <img className='arrow-progres' src='images/icons/arrow_progres.png' alt='Прогрес стрелка' />
        )}
      {currentStep <= questions.length && (
        <div className="choice-parametrs">
          <div className="progres-bar-conts">
            <div className="progres-bar-cont" style={{width: `${showForm || currentStep === 0 ? '100%' : 'calc(702.4px * var(--scale))'}`, transition: 'width 0.3s ease-in-out'}}>
              <div 
                className="progres-bar" 
                style={{ 
                  width: `${progressPercentage}%`,
                  transition: 'width 0.3s ease-in-out'
                }}
              >
              <div className={`progress-text ${showForm ? 'sform' : ''}`}>{!showForm && (<>{currentStep+1}/{questions.length}</>)}{showForm && (<>Готово!</>)}</div>

              </div>
            </div>
            {currentStep > 0 && (
              <>
                {!showForm && (
                  <button className="selection-button button-purple" onClick={() => {
                    currentStep-1 === 0 ? setProject(null) : ''
                    const lastKey = questions[currentStep - 1].key;
                    const newSelections = { ...selections };
                    delete newSelections[lastKey];
                    setSelections(newSelections);
                    setCurrentStep(s => s - 1);
                  }}>
                    <span>Назад</span>
                  </button>
                )}
              </>
            )}
          </div>
          {!showForm && (
            <div className="progres-title-cont">
              <div className="progres-title-num-cont">
                <p className="progres-title-num">{currentStep + 1}</p>
              </div>
              <p className="progres-title">{currentQuestion.title}</p>
            </div>
          )}
          {!showForm && (
            <div className="project-selection-cards">
            {currentQuestion.options.map((opt, i) => (
              <div key={i} className="project-selection-card" onClick={() => handleSelect(opt.value)}>
                <Image alt={opt.label} className="project-selection-img" src={`/images/progres/${opt.img}`} width={232.448} height={143.776} />
                <div className="project-parametr">{opt.label}</div>
                <div className="project-parametr-choice">
                  <img alt="Галочка" className="check_mark_purple" src="/images/icons/check_mark_purple.svg" />
                </div>
              </div>
            ))}
          </div>
          )}
          {showForm && (
            <RequestProgresForm id_project={project.id} />
          )}
          
        </div>
      )}

      
    </div>
  );
}