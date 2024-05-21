import React from 'react';
import './partners.scss';
import Navigation from '../../Navigation/Navigation';
import { useTranslation } from 'react-i18next';
import { Personal } from '../../Global/Images';
import { Link } from 'react-router-dom';


const Partners = () => {

  const { t } = useTranslation();
  
  return (
    <div className='docs'>
      <Navigation title={t("partners")} nav2={t("docs")} nav3={t("partners")} />
      <div className="box docs__inner">
        <p className="docs__text">{t("docs.text")}</p>
        <div className="docs__content">
        <div className="docs__sidebar">
          <Link to="/about" className='sidebar__title' >{t("about")}</Link>
          <div className="sidebar__line"></div>
          <Link to="/about/partners" className='sidebar__title' >{t("partners")}</Link>
          <div className="sidebar__line"></div>
          <Link to="/about/requisites" className='sidebar__title' >{t("props")}</Link>
        </div>
          <div className="partners__items">
            <div className="partners__item">
              <img src={Personal.reqtangle} alt="reqtangle" />
              <h3 className="partners__title">ТОО KAZCOP</h3>
            </div>
            <div className="partners__item">
              <img src={Personal.reqtangle} alt="reqtangle" />
              <h3 className="partners__title">ТОО KAZCOP</h3>
            </div>
            <div className="partners__item">
              <img src={Personal.reqtangle} alt="reqtangle" />
              <h3 className="partners__title">ТОО KAZCOP</h3>
            </div>  
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
