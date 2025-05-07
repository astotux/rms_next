import RequestForm from "@/components/request";
import RequestBodyForm from "@/components/request_body";
import Map from "@/components/map";
import ProjectSlider from "@/components/slider";

export default function Home() {
  return (
    <main>
        <section className="banner">
            <div className="banner-img"></div>
            <div className="banner-black"></div>
            <div className="banner-container">
                <div className="banner-content">
                    <h1 className="banner-title">РМСтрой — Строительство домов под ключ в Сыктывкаре и области</h1>
                    <p className="banner-text">"РМСтрой" - это современная и динамично развивающаяся строительная
                        организация, располагающая своим собственным производством арболитовых блоков
                        в Сыктывкаре.</p>
                    <ul className="advantages">
                        <li>
                            <div className="check-block"><img alt="✓" src="/images/icons/check_mark.svg" /></div>
                            <span>Без изменений цен в ходе строительства</span>
                        </li>
                        <li>
                            <div className="check-block"><img alt="✓" src="/images/icons/check_mark.svg" /></div>
                            <span>Строим с
                                эксроу-счетом</span>
                        </li>
                        <li>
                            <div className="check-block"><img alt="✓" src="/images/icons/check_mark.svg" /></div>
                            <span>Индивидуальные проекты под ваш бюджет</span>
                        </li>
                        <li>
                            <div className="check-block"><img alt="✓" src="/images/icons/check_mark.svg" /></div>
                            <span>Гарантия на все виды работ</span>
                        </li>
                    </ul>
                </div>
                <div className="banner-tasklist">
                    <RequestForm />
                </div>
                <img className="list-img" src="/images/lis.png" />
            </div>
        </section>
        <section className="partner-banks">
            <div className="partner-cont">
                <div className="partner-title-cont title-cont">
                    <img alt="Калькулятор ипотеки" className="title-image" src="/images/icons/calculator.svg" />
                    <h2 className="partner-title title-top">Наши банки-партнёры</h2>
                </div>
                <div className="banks-container" itemScope="" itemType="https://schema.org/FinancialService">
                    <meta content="Банки-партнеры РМСтрой" itemProp="name" />
                    <a className="bank-block" href="#" itemScope="" itemType="https://schema.org/BankOrCreditUnion">
                        <meta content="СберБанк" itemProp="name" />
                        <img alt="СберБанк" className="bank-img" src="/images/sberbank.png" />
                    </a>
                    <a className="bank-block" href="#" itemScope="" itemType="https://schema.org/BankOrCreditUnion">
                        <meta content="ВТБ" itemProp="name" />
                        <img alt="ВТБ" className="bank-img" src="/images/vtb.png" />
                    </a>
                    <a className="bank-block" href="#" itemScope="" itemType="https://schema.org/BankOrCreditUnion">
                        <meta content="РоссельхозБанк" itemProp="name" />
                        <img alt="РоссельхозБанк" className="bank-img" src="/images/rosbank.png" />
                    </a>
                </div>
            </div>
        </section>
        <div style={{display: "flex", justifyContent: "center"}}>
            <hr className="line" />
        </div>
        <section className="ready-projects">
            <div>
                <meta content="Готовые проекты домов от РМСтрой" itemProp="name" />
                <meta content="Выберите проект дома под ключ с учетом этажности, площади и количества комнат."
                    itemProp="description" />
            </div>
            <div style={{width: '100%'}}>
                <div className="ready-projects-titles-cont top-title-cont">
                    <div className="ready-projects-title-cont title-cont">
                        <img alt="Проекты домов" className="title-image" src="/images/icons/folder.svg" />
                        <h2 className="ready-projects-title title-top">Готовые проекты домов</h2>
                    </div>
                    <div className="all-project-cont">
                        <a className="all-project-div" href="#"><span>Все проекты домов</span></a>
                    </div>
                </div>
                <ProjectSlider />
            </div>
        </section>
        <div style={{display: "flex", justifyContent: "center"}}>
            <hr className="line" />
        </div>
        <section className="request-section">
            <div className="request">
                <div className="request-cont-2">
                    <div className="request-title-cont title-cont">
                        <img alt="Тасклист" className="request-tasklist-img" src="/images/icons/tasklists.svg" />
                        <div className="request-left-block">
                            <h2 className="request-title">Оставьте заявку на консультацию</h2>
                            <ul className="advantages advant-cont">
                                <p className="advantages-title">После разговора с нашим специалистом вы получите:</p>
                                <li>
                                    <div className="check-block"><img alt="✓" src="/images/icons/check_mark.svg" /></div>
                                    <span>Концепцию дома</span>
                                </li>
                                <li>
                                    <div className="check-block"><img alt="✓" src="/images/icons/check_mark.svg" /></div>
                                    <span>Расчет стоимости</span>
                                </li>
                                <li>
                                    <div className="check-block"><img alt="✓" src="/images/icons/check_mark.svg" /></div>
                                    <span>Индивидуальные рекомендации</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <RequestBodyForm />
                </div>

            </div>

        </section>
        <section className="banner-request">
            <div className="banner-request-img"></div>
            <div className="banner-black"></div>
            <div className="banner-request-cont" itemScope="" itemType="https://schema.org/HowTo">
                <img className="banner-request-list" src="/images/lis2.png" />
                <meta content="Как оформить заказ в РМСтрой" itemProp="name" />
                <h2 className="banner-request-title">Как оформить заказ?</h2>
                <div className="banner-request-overcont">
                    <div className="banner-request-content">
                        <div className="banner-request-num-cont">
                            <p className="banner-request-num">1</p>
                        </div>
                        <div itemProp="step" itemScope="" itemType="https://schema.org/HowToStep">
                            <meta content="Заявка и консультация" itemProp="name" />
                            <h3 className="banner-request-undtitle">Заявка и консультация</h3>
                            <p className="banner-request-text">Вы оставляете заявку на сайте или звоните нам.
                                Мы консультируем вас, отвечаем на вопросы и предварительно
                                оцениваем объем работ.</p>
                        </div>
                    </div>
                    <div className="banner-request-content">
                        <div className="banner-request-num-cont">
                            <p className="banner-request-num">2</p>
                        </div>
                        <div itemProp="step" itemScope="" itemType="https://schema.org/HowToStep">
                            <meta content="Осмотр и заключение договора" itemProp="name" />
                            <h3 className="banner-request-undtitle">Осмотр и заключение договора</h3>
                            <p className="banner-request-text">Наш специалист приезжает на объект, оценивает его состояние,
                                обсуждает с вами детали работ. После согласования составляем смету, заключаем договор,
                                где
                                фиксируем стоимость, сроки и условия оплаты.</p>
                        </div>
                    </div>
                    <div className="banner-request-content">
                        <div className="banner-request-num-cont">
                            <p className="banner-request-num">3</p>
                        </div>
                        <div itemProp="step" itemScope="" itemType="https://schema.org/HowToStep">
                            <meta content="Выполнение работ" itemProp="name" />
                            <h3 className="banner-request-undtitle">Выполнение работ</h3>
                            <p className="banner-request-text">Мы выполняем работы в соответствии с договором, соблюдая
                                СНИПы и
                                ГОСТы. По завершении вы принимаете результат, и мы передаем вам необходимые документы.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="project-selection">
            <div>
                <meta content="Подбор проекта дома РМСтрой" itemProp="name" />
                <meta
                    content="Интерактивный подбор проекта по параметрам: этажность, размер, площадь, количество комнат."
                    itemProp="description" />
            </div>
            <div style={{width: "100%"}}>
                <div className="ready-projects-titles-cont top-title-cont">
                    <div className="ready-projects-title-cont title-cont">
                        <img alt="Карандаш" className="title-image" src="/images/icons/pencil.svg" />
                        <h2 className="ready-projects-title title-top">Подбор проекта</h2>
                    </div>
                    <div className="all-project-cont">
                        <a className="all-project-div" href="#"><span>Все проекты домов</span></a>
                    </div>
                </div>
                <div>
                    <div className="project-selection-cont">
                        <div className="project-card ready-project">
                            <img alt="Проект дома ГДП 113" src="/images/house.png" />
                            <div>
                                <h3 className="card-title">“ГДП 113”</h3>
                                <p className="card-und-title">от <span className="card-price">10 600 000 ₽</span></p>
                            </div>
                            <ul>
                                <li>
                                    <div className="card-icon-cont">
                                        <img alt="Размер дома в метрах" src="/images/icons/size.svg" />
                                    </div>
                                    <div>
                                        <p className="card-parametrs-name">Размер</p>
                                        <p className="card-parametrs">10x8</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="card-icon-cont">
                                        <img alt="Количество этажей" src="/images/icons/floors.svg" />
                                    </div>
                                    <div>
                                        <p className="card-parametrs-name">Этажи</p>
                                        <p className="card-parametrs">2</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="card-icon-cont">
                                        <img alt="Общая площадь дома" src="/images/icons/square.svg" />
                                    </div>
                                    <div>
                                        <p className="card-parametrs-name">Площадь</p>
                                        <p className="card-parametrs">291.12</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="card-icon-cont">
                                        <img alt="Количество комнат" src="/images/icons/rooms.svg" />
                                    </div>
                                    <div>
                                        <p className="card-parametrs-name">Комнаты</p>
                                        <p className="card-parametrs">6</p>
                                    </div>
                                </li>
                            </ul>
                            <div className="card-button-cont">
                                <div className="card-share-cont button-purple">
                                    <img alt="Поделиться" src="/images/icons/share.png" />
                                </div>
                                <div className="more-button button-purple"><span>Подробнее</span></div>
                            </div>
                        </div>
                        <div className="choice-parametrs">
                            <div className="progres-bar-conts">
                                <div className="progres-bar-cont">
                                    <div className="progres-bar">
                                        1/5
                                    </div>
                                </div>
                                <button className="selection-button button-purple">
                                    <span>Назад</span>
                                </button>
                            </div>
                            <div className="progres-title-cont">
                                <div className="progres-title-num-cont">
                                    <p className="progres-title-num">1</p>
                                </div>
                                <p className="progres-title">Выберите этажность дома:</p>
                            </div>
                            <div className="project-selection-cards">
                                <div className="project-selection-card">
                                    <div className="project-parametr">Одноэтажный</div>
                                    <img alt="Одноэтажный дом" className="project-selection-img"
                                        src="/images/house.png" />
                                    <div className="project-parametr-choice"><img alt="Галочка" className="check_mark_purple"
                                            src="/images/icons/check_mark_purple.svg" /></div>
                                </div>
                                <div className="project-selection-card">
                                    <div className="project-parametr">Одноэтажный</div>
                                    <img alt="Одноэтажный дом" className="project-selection-img"
                                        src="/images/house.png" />
                                    <div className="project-parametr-choice"><img alt="Галочка" className="check_mark_purple"
                                            src="/images/icons/check_mark_purple.svg" /></div>
                                </div>
                                <div className="project-selection-card">
                                    <div className="project-parametr">Одноэтажный</div>
                                    <img alt="Одноэтажный дом" className="project-selection-img"
                                        src="/images/house.png" />
                                    <div className="project-parametr-choice"><img alt="Галочка" className="check_mark_purple"
                                            src="/images/icons/check_mark_purple.svg" /></div>
                                </div>
                                <div className="project-selection-card">
                                    <div className="project-parametr">Одноэтажный</div>
                                    <img alt="Одноэтажный дом" className="project-selection-img"
                                        src="/images/house.png" />
                                    <div className="project-parametr-choice"><img alt="Галочка" className="check_mark_purple"
                                            src="/images/icons/check_mark_purple.svg" /></div>
                                </div>
                                <div className="project-selection-card">
                                    <div className="project-parametr">Одноэтажный</div>
                                    <img alt="Одноэтажный дом" className="project-selection-img"
                                        src="/images/house.png" />
                                    <div className="project-parametr-choice"><img alt="Галочка" className="check_mark_purple"
                                            src="/images/icons/check_mark_purple.svg" /></div>
                                </div>
                                <div className="project-selection-card">
                                    <div className="project-parametr">Одноэтажный</div>
                                    <img alt="Одноэтажный дом" className="project-selection-img"
                                        src="/images/house.png" />
                                    <div className="project-parametr-choice"><img alt="Галочка" className="check_mark_purple"
                                            src="/images/icons/check_mark_purple.svg" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div style={{display: "flex", justifyContent: "center"}}>
            <hr className="line" />
        </div>
        <section className="project-selection">
            <div>
                <meta content="Готовые дома на карте" itemProp="name" />
                <meta content="Посмотрите расположение готовых домов от РМСтрой на карте." itemProp="description" />
            </div>
            <div style={{width: "100%"}}>
                <div className="ready-house-titles-cont top-title-cont">
                    <div className="ready-projects-title-cont title-cont">
                        <img alt="Глобус" className="title-image" src="/images/icons/globus.svg" />
                        <h2 className="ready-projects-title title-top">Готовые дома на карте</h2>
                    </div>
                    <div className="all-project-cont">
                        <a className="all-project-div" href="#"><span>Все проекты домов</span></a>
                    </div>
                </div>
                <div className="project-selection-cont">
                    <Map />
                </div>
            </div>
        </section>
    </main>
  );
}
