import '@/styles/main.css';
import '@/styles/reset.css';
import { Montserrat } from 'next/font/google'

const mont = Montserrat()

export default function RootLayout({ children }) {
  return (
      <html lang="ru">

      <head>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&amp;display=swap"
              rel="stylesheet" />
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1.0" name="viewport" />
          <meta
              content="РМСтрой - строительство домов под ключ в Сыктывкаре. Собственное производство арболитовых блоков. Проекты домов, строительные услуги."
              name="description" />
          <meta content="строительство домов, арболитовые блоки, проекты домов, строительство под ключ, Сыктывкар"
              name="keywords" />
          <meta content="РМСтрой" name="author" />
          <meta content="РМСтрой - Строительство домов под ключ в Сыктывкаре" property="og:title" />
          <meta
              content="Современная строительная организация с собственным производством арболитовых блоков. Проекты домов, строительные услуги."
              property="og:description" />
          <meta content="https://rmstroy.ru" property="og:url" />
          <meta content="website" property="og:type" />
          <title>РМСтрой - Строительство домов под ключ в Сыктывкаре</title>
          <script crossorigin src="https://cdn.jsdelivr.net/npm/react@17/umd/react.production.min.js"></script>
        <script crossorigin src="https://cdn.jsdelivr.net/npm/react-dom@17/umd/react-dom.production.min.js"></script>
        <script crossorigin src="https://cdn.jsdelivr.net/npm/@babel/standalone@7/babel.min.js"></script>
        <script src="https://api-maps.yandex.ru/v3/?apikey=85daff78-40ea-4ef0-9a88-8f36b0551e66&lang=ru_RU"></script>
      
      </head>

      <body className={mont.className}>
          <header className="header">
            <a href="#">
                <img alt="РМСтрой" className="logo" src="/images/icons/logo.svg" />
            </a>
            <nav className="nav">
                <a className="rectangle-button purple-gradient button-purple" href="#"><span>Отправить заявку</span></a>
                <a className="rectangle-button green-gradient all-project-div all-project-div-a" href="#"><span>Проекты
                        домов</span></a>
                <a className="black header-link" href="#">Услуги</a>
                <a className="black header-link" href="#">О нас</a>
            </nav>
            <div className="nav-info">
                <div>
                    <p className="nav-consult">Консультация | Круглосуточно</p>
                    <p className="company-phone">+7 (922) 080-89-59</p>
                </div>
                <a className="vk-logo" href="#">
                    <img alt="VK" className="vk-logo" src="/images/icons/vk.svg" />
                </a>
            </div>
        </header>
        {children}
        <footer>
            <div className="footer-cont">
                <img alt="РМСтрой" className="footer-logo" src="/images/icons/footer_logo.svg" />
                <nav className="nav">
                    <a className="black" href="#">Главная</a>
                    <a className="black" href="#">Все проекты</a>
                    <a className="black" href="#">Услуги</a>
                    <a className="black" href="#">О нас</a>
                </nav>
                <div className="nav-info">
                    <div>
                        <p className="nav-consult">Консультация | Круглосуточно</p>
                        <p className="company-phone">+7 (922) 080-89-59</p>
                    </div>
                    <img alt="VK" className="vk-logo" src="/images/icons/vk.svg" />
                </div>
            </div>
            <div className="p-s">
                <p>© 2016–2025, ООО «РМСтрой» </p>
                <p>Москва, 121170, Кутузовский проспект, д. 32, к. 1, ОГРН: 1157746652150 ИНН: 7736249247</p>
            </div>
        </footer>
      </body>

    </html>
  );
}
