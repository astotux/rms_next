import RequestForm from "@/components/request";
import RequestBodyForm from "@/components/request_body";
import Map from "@/components/map";
import ProjectSlider from "@/components/slider";
import ProjectSelector from "@/components/progres";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: 'РМСтрой - Строительство домов под ключ в Сыктывкаре',
    description:
      'РМСтрой – строительство домов из арболита, кирпича, каркаса и газобетона под ключ в Сыктывкаре и области. Индивидуальные проекты, фиксированная цена и гарантия на все работы.',
    keywords: [
      'строительство домов Сыктывкар',
      'дома под ключ',
      'проекты домов',
      'арболитовые дома',
      'каркасные дома',
      'кирпичные дома',
      'дом на заказ Сыктывкар',
    ],
    authors: [{ name: 'РМСтрой', url: 'https://rmstroi.ru' }],
    creator: 'РМСтрой',
    metadataBase: new URL('https://rmstroi.ru'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: 'https://rmstroi.ru',
      siteName: 'РМСтрой',
      title: 'РМСтрой – Строительство домов под ключ в Сыктывкаре',
      description:
        'Индивидуальные проекты, гарантия, фиксированная цена. Строительство домов из арболита, кирпича и газобетона в Сыктывкаре и области.',
      images: [
        {
          url: 'https://rmstroi.ru/images/preview.png',
          width: 1200,
          height: 630,
          alt: 'Дом от РМСтрой',
        },
      ],
    },
  };
  

export default function Home() {
  return (
    <main>
        <section className="banner">
            <div className="banner-img banner-1-img"></div>
            <div className="banner-black"></div>
            <div className="banner-container">
                <div className="banner-content">
                    <h1 className="banner-title">РМСтрой — Строительство домов под ключ в Сыктывкаре и области</h1>
                    <p className="banner-text">"РМСтрой" - это современная и динамично развивающаяся строительная
                        организация, располагающая своим собственным производством арболитовых блоков
                        в Сыктывкаре.</p>
                    <ul className="advantages">
                        <li>
                            <div className="check-block"><Image alt="✓" src="/images/icons/check_mark.svg" width={300} height={300} /></div>
                            <span>Без изменений цен в ходе строительства</span>
                        </li>
                        <li>
                            <div className="check-block"><Image alt="✓" src="/images/icons/check_mark.svg" width={300} height={300} /></div>
                            <span>Строим с
                                эксроу-счетом</span>
                        </li>
                        <li>
                            <div className="check-block"><Image alt="✓" src="/images/icons/check_mark.svg" width={300} height={300} /></div>
                            <span>Индивидуальные проекты под ваш бюджет</span>
                        </li>
                        <li>
                            <div className="check-block"><Image alt="✓" src="/images/icons/check_mark.svg" width={300} height={300} /></div>
                            <span>Гарантия на все виды работ</span>
                        </li>
                    </ul>
                </div>
                <div className="banner-tasklist">
                    <RequestForm />
                </div>
                <Image alt="Листья" className="list-img" src="/images/lis.png" width={800} height={400}/>
            </div>
        </section>
        <section className="partner-banks">
            <div className="partner-cont">
                <div className="partner-title-cont title-cont">
                    <Image alt="Калькулятор ипотеки" className="title-image" src="/images/icons/calculator.svg"  width={600} height={300}/>
                    <h2 className="partner-title title-top">Наши банки-партнёры</h2>
                </div>
                <div className="banks-container" itemScope="" itemType="https://schema.org/FinancialService">
                    <meta content="Банки-партнеры РМСтрой" itemProp="name" />
                    <Link className="bank-block" href="sber" itemScope="" itemType="https://schema.org/BankOrCreditUnion">
                        <meta content="СберБанк" itemProp="name" />
                        <Image alt="СберБанк" className="bank-img" src="/images/sberbank.png"  width={900} height={300} />
                    </Link>
                    <Link className="bank-block" href="vtb" itemScope="" itemType="https://schema.org/BankOrCreditUnion">
                        <meta content="ВТБ" itemProp="name" />
                        <Image alt="ВТБ" className="bank-img" src="/images/vtb.png"  width={900} height={300} />
                    </Link>
                    <Link className="bank-block" href="rosselhoz" itemScope="" itemType="https://schema.org/BankOrCreditUnion">
                        <meta content="РоссельхозБанк" itemProp="name" />
                        <Image alt="РоссельхозБанк" className="bank-img" src="/images/rosbank.png"  width={900} height={300} />
                    </Link>
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
                        <Image alt="Проекты домов" className="title-image" src="/images/icons/folder.svg"  width={300} height={300} />
                        <h2 className="ready-projects-title title-top">Готовые проекты домов</h2>
                    </div>
                    <div className="all-project-cont">
                        <Link className="all-project-div link-projects" href="projects"><span>Все проекты домов</span></Link>
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
                        <Image alt="Тасклист" className="request-tasklist-img" src="/images/icons/tasklists.svg"  width={300} height={300} />
                        <div className="request-left-block">
                            <h2 className="request-title">Оставьте заявку на консультацию</h2>
                            <ul className="advantages advant-cont">
                                <p className="advantages-title">После разговора с нашим специалистом вы получите:</p>
                                <li>
                                    <div className="check-block"><Image alt="✓" src="/images/icons/check_mark.svg"  width={300} height={300}/></div>
                                    <span>Концепцию дома</span>
                                </li>
                                <li>
                                    <div className="check-block"><Image alt="✓" src="/images/icons/check_mark.svg"  width={300} height={300}/></div>
                                    <span>Расчет стоимости</span>
                                </li>
                                <li>
                                    <div className="check-block"><Image alt="✓" src="/images/icons/check_mark.svg"  width={300} height={300}/></div>
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
                <Image alt="Листья" className="banner-request-list" src="/images/lis2.png" width={800} height={400}/>
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
                        <Image alt="Карандаш" className="title-image" src="/images/icons/pencil.svg"  width={300} height={300}/>
                        <h2 className="ready-projects-title title-top">Подбор проекта</h2>
                    </div>
                    <div className="all-project-cont">
                        <Link className="all-project-div link-projects" href="projects"><span>Все проекты домов</span></Link>
                    </div>
                </div>
                <div>
                    <ProjectSelector />
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
                        <Image alt="Глобус" className="title-image" src="/images/icons/globus.svg"  width={300} height={300}/>
                        <h2 className="ready-projects-title title-top">Готовые дома на карте</h2>
                    </div>
                    <div className="all-project-cont">
                        <Link className="all-project-div link-projects" href="projects"><span>Все проекты домов</span></Link>
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
