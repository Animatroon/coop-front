import React from 'react';
import './footer.scss'
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


import { Main } from '../Global/Images';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <Container fluid className='pt-5 footer__container'>
        <div className='footer__items'>
          <div className='footer__item footer__item-1'>
            <h3 className="footer__title">{t("footer.title")}</h3>
            <p className="footer__text">{t("footer.text")}</p>
            <div className="copyright">© 2024</div>
          </div>
          <div className='footer__item footer__item-2'>
            <ul className="footer__links">
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/">{t("main")}</Link></li>
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/news">{t("news")}</Link></li>
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/contacts">{t("contacts")}</Link></li>
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/about">{t("about")}</Link></li>
            </ul>

            <ul className="footer__links">
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/catalogs">Каталог</Link></li>
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/catalogs/poisk_pravoobladateley">{t("catalog.item4")}</Link></li>
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/catalogs/reestr">{t("catalog.item2")}</Link></li>
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/catalogs/inostrannye_okupy">{t("catalog.item3")}</Link></li>
            </ul>

            <ul className="footer__links">
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/docs/accreditations">{t("acredit")}</Link></li>
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/docs">{t("docs")}</Link></li>
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/about/requisites">{t("props")}</Link></li>
              <li className="footer__link"><Link onClick={() => window.scrollTo(0, 0)} to="/about/partners">{t("partners")}</Link></li>
            </ul>
          </div>
        </div>
        <Row className='footer__contacts mx-auto'>
          <Col className='footer__contacts-item'>
          <div className="footer__link link-map">
            <div className="footer__link-con">
              <img src={Main.cont1} alt="" />
            </div>
            <a href="mailto:office@kazcop.kz">office@kazcop.kz</a>

          </div>
          </Col>
          <Col className='footer__contacts-item'>
          <div className="footer__link link-map">
            <div className="footer__link-con">
              <img src={Main.cont2} alt="" />
            </div>
            <a href="tel:+77784177771">+7 778 417 7771</a>
          </div>
          </Col>
          <Col className='footer__contacts-item'>
          <div className="footer__link link-map">
            <div className="footer__link-con">
              <img src={Main.cont3} alt="" />
            </div>
            <a href="https://go.2gis.com/eqiq9">г. Алматы, ул. Тулебаева 117, офис 2</a>
          </div>
          </Col>
        </Row>
      </Container> 

    </div>
  )
}

export default Footer
