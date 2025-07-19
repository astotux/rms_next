import '@/styles/main.css';
import '@/styles/reset.css';
import { Montserrat } from 'next/font/google'
import Link from 'next/link';

const mont = Montserrat({
  subsets: ['cyrillic'],
  preload: true,
})

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link crossorigin href="https://fonts.gstatic.com" rel="preconnect" />
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
            <Link href="/">
                <img alt="РМСтрой" className="logo" src="/images/icons/logo.svg" />
            </Link>
            <nav className="nav desktop-nav">
                <Link className="rectangle-button green-gradient all-project-div all-project-div-a" href="/projects"><span>Проекты
                        домов</span></Link>
                        <div className="dropdown">
                        <button className="dropdown-btn black">Банки-партнёры</button>
                        <div className="dropdown-content">
                            <Link href="/sber">СберБанк</Link>
                            <Link href="/vtb">ВТБ</Link>
                            <Link href="/rosselhoz">РоссельхозБанк</Link>
                        </div>
                    </div>
            </nav>
            <div className="nav-info desktop-nav">
                <div>
                    <p className="nav-consult">Консультация | Круглосуточно</p>
                    <Link className="company-phone" href='tel:+79220808959'>+7 (922) 080-89-59</Link>
                </div>
                <Link className="vk-logo" href="https://vk.com/rmstroikomi">
                    <img alt="VK" className="vk-logo" src="/images/icons/vk.svg" />
                </Link>
            </div>
            {/* Бургер-меню */}
            <button className="burger-btn" aria-label="Открыть меню">
              <span></span>
              <span></span>
              <span></span>
            </button>
            {/* Мобильное меню */}
            <div className="mobile-menu">
              <nav className="mobile-nav">
                <Link href="/projects">Проекты домов</Link>
                <div className="mobile-dropdown">
                  <span>Банки-партнёры</span>
                  <div className="mobile-dropdown-content">
                    <Link href="/sber">СберБанк</Link>
                    <Link href="/vtb">ВТБ</Link>
                    <Link href="/rosselhoz">РоссельхозБанк</Link>
                  </div>
                </div>
                <div className="mobile-info">
                  <p className="nav-consult">Консультация | Круглосуточно</p>
                  <Link className="company-phone" href='tel:+79220808959'>+7 (922) 080-89-59</Link>
                  <Link className="vk-logo" href="https://vk.com/rmstroikomi">
                    <img alt="VK" className="vk-logo" src="/images/icons/vk.svg" />
                  </Link>
                </div>
              </nav>
            </div>
          </header>
        {children}
        <footer>
            <div className="footer-cont">
                <Link className="black" href="/">
                    <img alt="РМСтрой" className="footer-logo" src="/images/icons/footer_logo.svg" />
                </Link>
                <nav className="nav">
                    <Link className="black" href="/">Главная</Link>
                    <Link className="black" href="/projects">Все проекты</Link>
                </nav>
                <div className="nav-info">
                    <div>
                        <p className="nav-consult">Консультация | Круглосуточно</p>
                        <Link className="company-phone" href='tel:+79220808959'>+7 (922) 080-89-59</Link>
                    </div>
                    <Link className="vk-logo" href="https://vk.com/rmstroikomi">
                        <img alt="VK" className="vk-logo" src="/images/icons/vk.svg" />
                    </Link>
                </div>
            </div>
            <div className="p-s">
                <p>© 2016–2025, ООО «РМСтрой» </p>
                <p>Москва, 121170, Кутузовский проспект, д. 32, к. 1, ОГРН: 1157746652150 ИНН: 7736249247</p>
            </div>
        </footer>
        {/* Обычный JS для бургер-меню */}
        <script dangerouslySetInnerHTML={{__html:`
          document.addEventListener('DOMContentLoaded', function() {
            var burger = document.querySelector('.burger-btn');
            var mobileMenu = document.querySelector('.mobile-menu');
            if (!burger || !mobileMenu) return;
            burger.addEventListener('click', function() {
              burger.classList.toggle('open');
              mobileMenu.classList.toggle('open');
            });
            mobileMenu.querySelectorAll('a').forEach(function(link) {
              link.addEventListener('click', function() {
                burger.classList.remove('open');
                mobileMenu.classList.remove('open');
              });
            });
          });
        `}} />
      </body>

    </html>
  );
}
