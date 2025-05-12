// export async function generateMetadata({ params }) {
//     const res = await fetch(`http://localhost:3000/api/projects/${params.id}`);
//     const project = await res.json();
  
//     return {
//       title: `${project.name} | РМСтрой`,
//       description: `${project.floors}-этажный дом площадью ${project.area} м²`,
//       openGraph: {
//         title: `${project.name} | РМСтрой`,
//         description: `Проект дома от РМСтрой. ${project.floors} этажа, ${project.area} м²`,
//         images: project.images.length > 0 ? [
//           {
//             url: project.images[0].url,
//             width: 800,
//             height: 600,
//             alt: `Проект дома ${project.name}`,
//           }
//         ] : [],
//         url: `https://ваш-сайт/projects/${params.id}`,
//         type: 'website',
//       },
//       twitter: {
//         card: 'summary_large_image',
//         title: `${project.name} | РМСтрой`,
//         description: `Проект дома от РМСтрой. ${project.floors} этажа, ${project.area} м²`,
//         images: project.images.length > 0 ? [project.images[0].url] : [],
//       }
//     };
//   }

import ProjectSlider from "@/components/slider";
import '@/styles/project.css';
  
export default function ProjectPage({ params }) {
  return (
    <main>
      <section className="project-card-cont" itemScope itemType="https://schema.org/Product">
        <meta itemProp="name" content="ГДП 113" />
        <meta itemProp="description" content="Двухэтажный дом площадью 291.12 м²" />
        <meta itemProp="brand" content="РМСтрой" />
        <meta itemProp="category" content="Дом" />
        <div className="project-gallery">
            <img src="../images/house.png" alt="Проект дома ГДП 113" className="main-image" itemProp="image" />
            <div className="thumbnails">
                <img src="../images/house.png" alt="Фото проекта ГДП 113" itemProp="image" />
                <img src="../images/house.png" alt="Фото проекта ГДП 113" itemProp="image" />
                <img src="../images/house.png" alt="Фото проекта ГДП 113" itemProp="image" />
                <img src="../images/house.png" alt="Фото проекта ГДП 113" itemProp="image" />
            </div>
            <div className="progress-bar"></div>
        </div>

        <div className="project-info">
            <div className="project-header">
                <h2 itemProp="name">"ГДП 113"</h2>
                <button className="share-btn">Поделиться <img alt="Поделиться" src="../images/icons/share.png"
                        className="share-icon" /></button>
            </div>

            <hr className="mini-line" />

            <div className="price-block">
                <span className="label">от<span className="price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta itemProp="price" content="10600000" />
                    <meta itemProp="priceCurrency" content="RUB" />
                    <span itemProp="price">10 600 000 ₽</span>
                </span></span>
                <span className="credit">с эскроу счетом</span>
            </div>

            <hr className="mini-line" />

            <div className="features">
                <div className="feature">
                    <div className="card-icon-cont feature-icon-cont">
                        <img alt="Размер дома в метрах" src="../images/icons/size.svg" />
                    </div>
                    <span className="feature-title">Размер<br /><strong itemProp="width">10×8</strong></span>
                </div>
                <div className="feature">
                    <div className="card-icon-cont feature-icon-cont">
                        <img alt="Количество этажей" src="../images/icons/floors.svg" />
                    </div>
                    <span className="feature-title feature-icon-cont">Этажи<br /><strong itemProp="numberOfFloors">2</strong></span>
                </div>
                <div className="feature">
                    <div className="card-icon-cont feature-icon-cont">
                        <img alt="Общая площадь дома" src="../images/icons/square.svg" />
                    </div>
                    <span className="feature-title">Площадь<br /><strong itemProp="floorSize">291.12</strong></span>
                </div>
                <div className="feature">
                    <div className="card-icon-cont feature-icon-cont">
                        <img alt="Количество комнат" src="../images/icons/rooms.svg" />
                    </div>
                    <span className="feature-title">Комнаты<br /><strong itemProp="numberOfRooms">6</strong></span>
                </div>
                <div className="feature">
                    <div className="card-icon-cont feature-icon-cont">
                        <img alt="Количество комнат" src="../images/icons/rooms.svg" />
                    </div>
                    <span className="feature-title">Материал стен<br /><strong itemProp="material">Арболит</strong></span>
                </div>
            </div>

            <hr className="mini-line" />

            <div className="description">
                <h3>Описание проекта</h3>
                <p itemProp="description">
                    Замечательный проект и разработчик сайта. Замечательный проект и разработчик сайта.
                    Замечательный проект и разработчик сайта. Замечательный проект и разработчик сайта.
                    Замечательный проект и разработчик сайта. Замечательный проект!
                </p>
            </div>
        </div>
    </section>
    <section className="pricing-section" itemScope itemType="https://schema.org/Product">
        <h2>Комплектация и цены</h2>
        <div className="pricing-cards">
            <div className="card" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="price" content="10600000" />
                <meta itemProp="priceCurrency" content="RUB" />
                <h3>Под крышу <br /><span>от <span itemProp="price">10 600 000 ₽</span></span></h3>
                <ul itemProp="description">
                    <li><strong>Стены:</strong> Арболит толщ. 300мм</li>
                    <li><strong>Перекрытие:</strong> Лаги толщиной 50*200мм, без утепления</li>
                    <li><strong>Крыша:</strong> Двускатная из профнастила</li>
                </ul>
                <div className="tasklist-cont">
                    <button className="tasklist-button copmlectation-button" type="submit"><img alt="Оставить заявку на консультацию"
                            className="tasklist-icon" src="../images/icons/tasklists.svg" />
                        <span>Отправить заявку</span>
                    </button>
                    <p className="note">Оставьте заявку на консультацию по выбранному проекту.<br /> Мы вас перезвоним!</p>
                </div>
            </div>
            <div className="card" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="price" content="12600000" />
                <meta itemProp="priceCurrency" content="RUB" />
                <h3>Тёплый контур<br /><span>от <span itemProp="price">12 600 000 ₽</span></span></h3>
                <ul itemProp="description">
                    <li><strong>Стены:</strong> Арболит толщ. 300мм</li>
                    <li><strong>Перекрытие:</strong> Лаги 50*200мм без утепления</li>
                    <li><strong>Чердачное перекрытие:</strong> Утепление 200мм с обрешёткой</li>
                    <li><strong>Крыша:</strong> Двускатная из металлочерепицы</li>
                    <li><strong>Окна:</strong> Выполнены из профиля PROPLEX</li>
                    <li><strong>Дверь:</strong> Утепленная с терморазрывом.</li>
                </ul>
                <div className="tasklist-cont">
                    <button className="tasklist-button copmlectation-button" type="submit"><img alt="Оставить заявку на консультацию"
                            className="tasklist-icon" src="../images/icons/tasklists.svg" />
                        <span>Отправить заявку</span>
                    </button>
                    <p className="note">Оставьте заявку на консультацию по выбранному проекту.<br /> Мы вас перезвоним!</p>
                </div>
            </div>

            <div className="card" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="price" content="17600000" />
                <meta itemProp="priceCurrency" content="RUB" />
                <h3 className="exclusive">Под ключ<br /><span>от <span itemProp="price">17 600 000 ₽</span></span></h3>
                <ul itemProp="description">
                    <li><strong>Стены:</strong> Арболит толщ. 300мм</li>
                    <li><strong>Перекрытие:</strong> Лаги 50*200мм без утепления</li>
                    <li><strong>Чердачное перекрытие:</strong> Утепление 200мм с обрешёткой</li>
                    <li><strong>Крыша:</strong> Двухскатная из профнастила</li>
                    <li><strong>Окна:</strong> Выполнены из профиля PROPLEX</li>
                    <li><strong>Дверь:</strong> Утепленная с терморазрывом.</li>
                    <li><strong>Отопление:</strong> Комбинированная система включающая в себя: теплые полы по всей площади, дополнительно с радиаторами на стенах</li>
                    <li><strong>Вода:</strong> Автономное водоснабжение с монтажом системы ХВС,ГВС</li>
                    <li><strong>Канализация:</strong> Автономная станция биологической очистки с монтажом труб по дому</li>
                    <li><strong>Электрика:</strong> Комплекс электромонтажных работ</li>
                </ul>
                <div className="tasklist-cont">
                    <button className="tasklist-button copmlectation-button" type="submit"><img alt="Оставить заявку на консультацию"
                            className="tasklist-icon" src="../images/icons/tasklists.svg" />
                        <span>Отправить заявку</span>
                    </button>
                    <p className="note">Оставьте заявку на консультацию по выбранному проекту.<br /> Мы вас перезвоним!</p>
                </div>
            </div>

        </div>
    </section>

    <section className="ready-projects">
        <div>
            <meta content="Готовые проекты домов от РМСтрой" itemProp="name" />
            <meta content="Выберите проект дома под ключ с учетом этажности, площади и количества комнат."
                itemProp="description" />
        </div>
        <div style={{width: "100%"}}>
            <div className="ready-projects-titles-cont top-title-cont">
                <div className="ready-projects-title-cont title-cont">
                    <img alt="Проекты домов" className="title-image" src="../images/icons/folder.svg" />
                    <h2 className="ready-projects-title title-top">Готовые проекты домов</h2>
                </div>
                <div className="all-project-cont">
                    <a className="all-project-div link-projects" href="#"><span>Все проекты домов</span></a>
                </div>
            </div>
            <ProjectSlider />
        </div>
    </section>
    </main>
  );
}