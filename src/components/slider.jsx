'use client'

import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ShareButton from './shareButton';
import 'swiper/css';
import 'swiper/css/navigation';
import '@/styles/main.css';
import Link from 'next/link';


const ProjectSlider = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price).replace('₽', '₽');
  };

  return (
    <div className="cards-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          240: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,

          },
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        loop={true}
        speed={600}
        className="project-cards"
      >
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <div className="project-card">
              {project.images.length > 0 && (
                <div className='project-img-conrainer'>
                  <img 
                    className='project-card-img'
                    alt={`Проект дома ${project.name}`} 
                    src={project.images[0].url} 
                    onError={(e) => {
                      e.target.src = '/images/house.png';
                    }}
                  />
                </div>
              )}
              <div>
                <h3 className="card-title">{project.name}</h3>
                {project.completions.length > 0 && (
                  <p className="card-und-title">от <span className="card-price">
                    {formatPrice(project.completions[0].price)}
                  </span></p>
                )}
              </div>
              <ul itemScope="" itemType="https://schema.org/Product">
                <meta content={project.name} itemProp="name" />
                <meta content={`${project.floors}-этажный дом площадью ${project.area} м²`} itemProp="description" />
                <meta content="РМСтрой" itemProp="brand" />
                <meta content="Дом" itemProp="category" />
                {project.completions.length > 0 && (
                  <div style={{display: "none"}} itemProp="offers" itemScope="" itemType="https://schema.org/Offer">
                    <meta content={project.completions[0].price} itemProp="price" />
                    <meta content="RUB" itemProp="priceCurrency" />
                  </div>
                )}
                <li>
                  <div className="card-icon-cont">
                    <img alt="Размер дома в метрах" src="/images/icons/size.svg" />
                  </div>
                  <div>
                    <p className="card-parametrs-name">Размер</p>
                    <p className="card-parametrs" content={project.width} itemProp="width">
                      {project.width}x{project.length}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card-icon-cont">
                    <img alt="Количество этажей" src="/images/icons/floors.svg" />
                  </div>
                  <div>
                    <p className="card-parametrs-name">Этажи</p>
                    <p className="card-parametrs" content={project.floors} itemProp="numberOfFloors">
                      {project.floors}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card-icon-cont">
                    <img alt="Общая площадь дома" src="/images/icons/square.svg" />
                  </div>
                  <div>
                    <p className="card-parametrs-name">Площадь</p>
                    <p className="card-parametrs" content={project.area} itemProp="floorSize">
                      {project.area}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="card-icon-cont">
                    <img alt="Количество комнат" src="/images/icons/rooms.svg" />
                  </div>
                  <div>
                    <p className="card-parametrs-name">Комнаты</p>
                    <p className="card-parametrs" content={project.rooms} itemProp="numberOfRooms">
                      {project.rooms}
                    </p>
                  </div>
                </li>
              </ul>
              <div className="card-button-cont">
                <ShareButton project={project} />
                <Link href={`/projects/${project.id}`} className="more-button button-purple">
                  <span>Подробнее</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div ref={navigationPrevRef} className="arrow swiper-button-prev button-purple">
          <img alt="Стрелка влево" src="/images/icons/arrow_left.svg" />
        </div>
        <div ref={navigationNextRef} className="arrow swiper-button-next button-purple">
          <img alt="Стрелка вправо" src="/images/icons/arrow_right.svg" />
        </div>
      </Swiper>
    </div>
  );
};

export default ProjectSlider;