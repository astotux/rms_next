'use client'
import { useState, useEffect } from 'react'
import DoubleRangeSlider from './doubleRangeSlider'
import ProjectFeature from './projectFeature';
import ShareButton from './shareButton';
import Link from 'next/link';
import Image from 'next/image';

const PROJECTS_PER_PAGE = 9;

export default function Filter() {
  // Состояния фильтров
  const [priceRange, setPriceRange] = useState({ min: 1000000, max: 50000000 })
  const [squareRange, setSquareRange] = useState({ min: 10, max: 500 })
  const [floorsFilter, setFloorsFilter] = useState('')
  const [roomsFilter, setRoomsFilter] = useState('')
  
  // Состояния данных и пагинации
  const [projects, setProjects] = useState([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    perPage: PROJECTS_PER_PAGE
  })
  const [isLoading, setIsLoading] = useState(false)

  // Загрузка проектов с сервера
  const fetchProjects = async (page = 1) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        minPrice: priceRange.min.toString(),
        maxPrice: priceRange.max.toString(),
        minArea: squareRange.min.toString(),
        maxArea: squareRange.max.toString(),
        page: page.toString(),
        perPage: PROJECTS_PER_PAGE.toString(),
        ...(floorsFilter && { floors: floorsFilter }),
        ...(roomsFilter && { rooms: roomsFilter })
      })

      const response = await fetch(`/api/projects?${params.toString()}`)
      if (!response.ok) throw new Error('Ошибка загрузки')
      const { projects, pagination } = await response.json()
      
      setProjects(projects)
      setPagination(pagination)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Первоначальная загрузка
  useEffect(() => {
    fetchProjects(1)
  }, [])

  // Обработчики изменений
  const handlePriceChange = (values) => setPriceRange(values)
  const handleSquareChange = (values) => setSquareRange(values)
  const handleFloorsChange = (e) => setFloorsFilter(e.target.value)
  const handleRoomsChange = (e) => setRoomsFilter(e.target.value)

  // Поиск с фильтрами
  const handleSearch = () => {
    fetchProjects(1) // Всегда начинаем с первой страницы при новом поиске
  }

  // Сброс фильтров
  const handleReset = () => {
    setPriceRange({ min: 1000000, max: 50000000 })
    setSquareRange({ min: 10, max: 500 })
    setFloorsFilter('')
    setRoomsFilter('')
    fetchProjects(1)
  }

  // Изменение страницы
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      fetchProjects(page)
    }
  }

  // Форматирование цены
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price).replace('₽', '₽')
  }

  // Генерация номеров страниц
  const renderPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 4
    let startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2))
    let endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-list ${pagination.currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
          disabled={isLoading}
        >
          {i}
        </button>
      )
    }

    return pages
  }

  return (
    <section className="search-selection">
        <div>
            <meta content="Поиск проектов домов РМСтрой" itemProp="name" />
            <meta content="Поиск и подбор проектов домов по параметрам: стоимость, площадь, этажность, количество комнат."
                itemProp="description" />
        </div>
        <div className="request-cont">
            <div className="questions-titles-cont top-title-cont">
                <div className="ready-projects-title-cont title-cont">
                    <Image alt="Компас" className="title-image" src="images/icons/compas.svg" width={500} height={500} />
                    <h2 className="questions-title title-top">Поиск проектов домов</h2>
                </div>
                <div className="all-project-cont">
                    <a className="all-project-div link-projects" href="#progres"><span>Подобрать проект</span></a>
                </div>
            </div>
            <div className="search-project-cont">
        <div className="filter-form" itemScope itemType="https://schema.org/ItemList">
          <DoubleRangeSlider 
            min={1000000} 
            max={50000000} 
            step={100000} 
            values={priceRange}
            label="Стоимость строительства" 
            suffix="₽" 
            onChange={handlePriceChange} 
          />
          <DoubleRangeSlider 
            min={10} 
            max={500} 
            step={10} 
            values={squareRange}
            label="Площадь" 
            suffix="м²" 
            onChange={handleSquareChange} 
          />
          
          <div className="filter-row">
            <div className="filter-column">
              <label className="filter-label">Этажность</label>
              <select 
                className="filter-select" 
                value={floorsFilter}
                onChange={handleFloorsChange}
              >
                <option value="">Все</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="1 + мансарда">1 + мансарда</option>
                <option value="2 + мансарда">2 + мансарда</option>
              </select>
            </div>
            <div className="filter-column">
              <label className="filter-label">Комнаты</label>
              <select 
                className="filter-select" 
                value={roomsFilter}
                onChange={handleRoomsChange}
              >
                <option value="">Все</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </select>
            </div>
          </div>

          <div className="filter-buttons">
            <button 
              className="all-project-div search-btn" 
              onClick={handleSearch}
              disabled={isLoading}
            >
              <span>{isLoading ? 'Загрузка...' : 'Поиск проектов'}</span>
            </button>
            <button 
              className="button-purple search-btn" 
              onClick={handleReset}
              disabled={isLoading}
            >
              <span>Сбросить</span>
            </button>
          </div>
        </div>
        
        

        <div className="search-projects-cont">
        {isLoading ? (
          <div className="loading">Загрузка проектов...</div>
        ) : (
          <>
            <div className="search-projects-cards">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.id} className="search-card ready-project">
                    {project.images?.length > 0 ? (
                      <div className='project-img-conrainer'>
                        <Image 
                          className='project-card-img'
                          alt={`Проект дома ${project.name}`} 
                          src={project.images[0].url} 
                          onError={(e) => {
                            e.target.src = '/images/house.png';
                            e.target.onerror = null;
                          }}
                          width={800} height={400}
                        />
                      </div>
                    ) : (
                      <div className='project-img-conrainer'>
                        <Image 
                          className='project-card-img'
                          alt={`Проект дома ${project.name}`}
                          src="/images/house.png"
                          width={800} height={400}
                        />
                      </div>
                    )}
                    
                    <div>
                      <h3 className="card-title">{project.name}</h3>
                      {project.completions?.length > 0 && (
                        <p className="card-und-title">
                          от <span className="card-price">
                            {formatPrice(Math.min(...project.completions.map(c => c.price)))}
                          </span>
                        </p>
                      )}
                    </div>

                    <ul itemScope itemType="https://schema.org/Product">
                      {/* Schema.org метаданные */}
                      <meta content={project.name} itemProp="name" />
                      <meta content={`${project.floors}-этажный дом площадью ${project.area} м²`} itemProp="description" />
                      <meta content="РМСтрой" itemProp="brand" />
                      <meta content="Дом" itemProp="category" />
                      
                      {project.completions?.length > 0 && (
                        <div style={{display: "none"}} itemProp="offers" itemScope itemType="https://schema.org/Offer">
                          <meta content={Math.min(...project.completions.map(c => c.price))} itemProp="price" />
                          <meta content="RUB" itemProp="priceCurrency" />
                        </div>
                      )}

                      {/* Характеристики проекта */}
                      <ProjectFeature 
                        icon="/images/icons/size.svg"
                        alt="Размер дома в метрах"
                        name="Размер"
                        value={`${project.width}x${project.length}`}
                        prop="width"
                      />
                      
                      <ProjectFeature 
                        icon="/images/icons/floors.svg"
                        alt="Количество этажей"
                        name="Этажи"
                        value={project.floors}
                        prop="numberOfFloors"
                      />
                      
                      <ProjectFeature 
                        icon="/images/icons/square.svg"
                        alt="Общая площадь дома"
                        name="Площадь"
                        value={`${project.area} м²`}
                        prop="floorSize"
                      />
                      
                      <ProjectFeature 
                        icon="/images/icons/rooms.svg"
                        alt="Количество комнат"
                        name="Комнаты"
                        value={project.rooms}
                        prop="numberOfRooms"
                      />
                    </ul>

                    <div className="card-button-cont">
                      <ShareButton project={project} />
                      <Link href={`/projects/${project.id}`} className="more-button button-purple">
                        <span>Подробнее</span>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <p>По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.</p>
                </div>
              )}
            </div>

            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-list" 
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1 || isLoading}
                >
                  <Image src="/images/icons/arrow_left.svg" alt="Стрелка влево" width={500} height={500} />
                </button>
                
                {renderPageNumbers()}
                
                <button 
                  className="pagination-list" 
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages || isLoading}
                >
                  <Image src="/images/icons/arrow_right.svg" alt="Стрелка вправо" width={500} height={500} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

            </div>
        </div>
    </section>
  )
}
