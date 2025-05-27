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
          description: "Ипотека на строительство жилья для семей с детьми",
          pskRange: "5,8%–6,3%",
          rate: "от 6%",
          amount: "до 12 млн ₽",
          payment: "от 15%",
          term: "до 30 лет"
        },
        {
          name: "Ипотека для IT-специалистов",
          title: "Для IT",
          description: "Льготная ипотека на строительство для IT-специалистов",
          pskRange: "4,9%–5,7%",
          rate: "от 5%",
          amount: "до 18 млн ₽",
          payment: "от 15%",
          term: "до 30 лет"
        },
        {
          name: "Ипотека с материнским капиталом",
          title: "С мат. капиталом",
          description: "Строительство с привлечением средств маткапитала",
          pskRange: "9,6%–10,1%",
          rate: "от 9,1%",
          amount: "до 6 млн ₽",
          payment: "от 10%",
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
                  <h1 className="banner-title">Наша компания аккредитована в Россельхозбанке</h1>
                  <p className="banner-text">Россельхозбанк — один из ведущих банков России, специализирующийся на поддержке сельского хозяйства и загородного строительства. Банк активно развивает ипотечное кредитование, предлагая надёжные и выгодные условия для тех, кто строит собственный дом. Широкая линейка программ учитывает потребности разных категорий клиентов, включая семьи с детьми, IT-специалистов и владельцев материнского капитала.</p>
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
                    <span itemProp="name">первоначальный взнос — от 10% стоимости строительства</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="3" />
                    <span itemProp="name">максимальная сумма кредита — до 5 млн ₽ (в зависимости от региона)</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="4" />
                    <span itemProp="name">участок и строительство должны находиться в сельской местности или малом городе</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="5" />
                    <span itemProp="name">подрядчик должен быть аккредитован Россельхозбанком</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="6" />
                    <span itemProp="name">кредит выдается поэтапно — траншами, после проверки выполнения строительных работ</span>
                </li>
                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                    <meta itemProp="position" content="7" />
                    <span itemProp="name">необходима фотофиксация хода строительства через банковское приложение или сервис</span>
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
