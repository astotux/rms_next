import Filter from '@/components/filter'
import { prisma } from '@/lib/prisma'
import RequestForm from '@/components/request'
import ProjectSelector from '@/components/progres'
import '@/styles/projects.css';

export default async function ProjectsPage() {

  return (
    <main>
      <section className="banner">
        <div className="banner-img banner-2-img"></div>
        <div className="banner-black"></div>
        <div className="banner-container">
            <div className="banner-content" itemScope itemType="https://schema.org/LocalBusiness">
                <meta itemProp="name" content="РМСтрой" />
                <meta itemProp="description" content="Проекты домов для строительства" />
                <meta itemProp="image" content="images/house.png" />
                <meta itemProp="priceRange" content="$$$" />
                <meta itemProp="address" content="Сыктывкар" />
                <h1 className="banner-title">Проекты домов для строительства в Сыктывкаре</h1>
                <p className="banner-text">"РМСтрой" - это современная и динамично развивающаяся строительная организация, располагающая своим собственным производством арболитовых блоков в Сыктывкаре.</p>
            </div>
            <div className="banner-tasklist">
              <RequestForm />
            </div>
        </div>
      </section>

        <Filter />
      <div style={{display: "flex", justifyContent: "center"}}>
            <hr className="line" />
        </div>
    <section className="project-selection" id='progres'>
        <div>
            <meta content="Подбор проекта дома РМСтрой" itemProp="name" />
            <meta content="Интерактивный подбор проекта по параметрам: этажность, размер, площадь, количество комнат."
                itemProp="description" />
        </div>
        <div style={{width: "100%"}}>
            <div className="ready-projects-titles-cont top-title-cont">
                <div className="ready-projects-title-cont title-cont">
                    <img alt="Карандаш" className="title-image" src="images/icons/pencil.svg" />
                    <h2 className="ready-projects-title title-top">Подбор проекта</h2>
                </div>
                <div className="">
                </div>
            </div>
            <div>
              <ProjectSelector />
            </div>
        </div>
    </section>
    </main>
  )
}
