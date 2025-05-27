import RequestForm from "@/components/request"
import ProjectSlider from "@/components/slider";
import MortgagePrograms from "@/components/program_card";

import Link from "next/link";

import '@/styles/credit.css';

export default async function projectsPage() {
    const programs = [
        {
          name: "Семейная ипотека",
          title: "Семейная",
          description: "Ипотечная программа для семей с детьми",
          pskRange: "24,65%–31,76%",
          rate: "от 6%",
          amount: "до 12 млн ₽",
          payment: "от 20,1%",
          term: "до 30 лет"
        },
        {
          name: "Ипотека для IT",
          title: "Для IT",
          description: "Льготная программа для IT-специалистов",
          pskRange: "23,15%–30,23%",
          rate: "от 5%",
          amount: "до 18 млн ₽",
          payment: "от 20,1%",
          term: "до 30 лет"
        },
        {
          name: "Ипотека с мат. капиталом",
          title: "С мат. капиталом",
          description: "Программа с использованием материнского капитала",
          pskRange: "27,98%–33,01%",
          rate: "от 5%",
          amount: "до 1,74 млн ₽",
          payment: "от 5%",
          term: "до 25 лет"
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
                  <h1 className="banner-title">Наша компания аккредитована в ВТБ</h1>
                  <p className="banner-text">ВТБ — один из крупнейших и надёжнейших банков России, уверенно занимающий лидирующие позиции в сфере ипотечного кредитования. Особенно активную поддержку банк оказывает тем, кто планирует строительство собственного дома, предлагая широкий спектр ипотечных программ, адаптированных под разные категории клиентов.</p>
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
                    <span itemProp="name">первоначальный взнос — от 20% стоимости строительства</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="3" />
                    <span itemProp="name">максимальная сумма кредита — до 20 млн ₽ (в зависимости от региона и дохода)</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="4" />
                    <span itemProp="name">земельный участок должен быть в собственности заемщика</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="5" />
                    <span itemProp="name">строительство допускается с подрядчиком или самостоятельно</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="6" />
                    <span itemProp="name">средства выдаются поэтапно — траншами, на основании актов выполненных работ</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="7" />
                    <span itemProp="name">обязательное страхование жизни и имущества</span>
                </li>
            </ul>
            <p className="noted">
                Остальные условия программ кредитования не меняются. Договор можно заключить только с одной подрядной организацией.
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
