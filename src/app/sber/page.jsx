import RequestForm from "@/components/request"
import ProjectSlider from "@/components/slider";
import MortgagePrograms from "@/components/program_card";

import Link from "next/link";

import '@/styles/credit.css';

export const metadata = {
    title: "Ипотека от Сбербанка — РМСтрой",
    description: "Программы ипотечного кредитования на строительство дома от Сбербанка. Семейная ипотека, господдержка, IT-ипотека. Аккредитация подрядчика РМСтрой.",
    openGraph: {
      title: "Ипотека от Сбербанка — РМСтрой",
      description: "РМСтрой аккредитован в Сбербанке. Оформите ипотеку на строительство дома по выгодным ставкам.",
      url: "https://rmstroy.ru/sber",
      type: "website",
      images: [
        {
          url: "https://rmstroi.ru/images/preview.jpg",
          width: 1200,
          height: 630,
          alt: "Ипотека от Сбербанка",
        },
      ],
    },
  };

export default async function projectsPage() {
    const programs = [
        {
          name: "Семейная ипотека",
          title: "Семейная",
          description: "Ипотека для семей с детьми на строительство дома",
          pskRange: "6,3%–25,1%",
          rate: "от 5,3%",
          amount: "до 12 млн ₽",
          payment: "от 15%",
          term: "до 30 лет"
        },
        {
          name: "Ипотека для IT",
          title: "Для IT",
          description: "Льготная ипотека для IT-специалистов на строительство",
          pskRange: "6,3%–9,98%",
          rate: "от 4,7%",
          amount: "до 18 млн ₽",
          payment: "от 15%",
          term: "до 30 лет"
        },
        {
          name: "Ипотека с мат. капиталом",
          title: "С мат. капиталом",
          description: "Программа с использованием материнского капитала",
          pskRange: "6,3%–25,1%",
          rate: "от 5,3%",
          amount: "до 12 млн ₽",
          payment: "от 15%",
          term: "до 30 лет"
        }
      ];
      



  return (
    <main>
      <section className="banner">
          <div className="banner-img"></div>
          <div className="banner-black"></div>
          <div className="banner-container">
              <div className="banner-content" itemScope itemType="https://schema.org/LocalBusiness">
                  <meta itemProp="name" content="РМСтрой" />
                  <meta itemProp="description" content="Ипотека на строительство дома" />
                  <meta itemProp="image" content="images/house.png" />
                  <meta itemProp="priceRange" content="$$$" />
                  <meta itemProp="address" content="Сыктывкар" />
                  <h1 className="banner-title">Наша компания аккредитована в Сбере</h1>
                  <p className="banner-text">Сбербанк является одним из лидеров в сфере ипотечного кредитования в России. Он
                      предлагает выгодные условия для покупки жилья и строительства частного дома, включая господдержку и
                      индивидуальные программы.</p>
              </div>
              <div className="banner-tasklist">
                    <RequestForm />
              </div>
          </div>
      </section>

    <section className="mortgage-section">
        <div className="mortgage-left">
            <div className="partner-title-cont title-cont">
              <img src="images/icons/paper.svg" alt="Ипотека" className="title-image" />
              <h2 className="mortgage-title title-top">Программы по ипотеке</h2>
            </div>
            <p className="subtitle">Условия кредитования:</p>
            <ul className="conditions" itemScope itemType="https://schema.org/ItemList">
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="1" />
                    <span itemProp="name">строительство дома в рамках базовой программы</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="2" />
                    <span itemProp="name">первоначальный взнос — от 25,1% стоимости строительства</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="3" />
                    <span itemProp="name">максимальная сумма кредита — 12 млн руб.</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="4" />
                    <span itemProp="name">регионы строительства не входят в список исключений</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="5" />
                    <span itemProp="name">строительство ведётся с подрядчиком из списка рекомендованных банком</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="6" />
                    <span itemProp="name">выдача только частями (траншами)</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="7" />
                    <span itemProp="name">необходима фотофиксация через спец. приложение</span>
                </li>
            </ul>
            <p className="noted">
                Остальные условия программ кредитования не меняются. Договор можно заключить только с одной подрядной
                организацией.
            </p>
        </div>

        <MortgagePrograms
            calculatorLink="https://domclick.ru/ipoteka/calculator"
            secondLink="https://syktyvkar.domclick.ru/stroitelstvo-domov/katalog-podriadchikov/card/rmstroi_297298"
            secondIcon="/images/icons/domclick.png"
            secondText="ДомКлик"
            programs={programs}
        />

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
                        <Link className="all-project-div link-projects" href="projects"><span>Все проекты домов</span></Link>
                    </div>
                </div>
                <ProjectSlider />
            </div>
        </section>
    </main>
  )
}
