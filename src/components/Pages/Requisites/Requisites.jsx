import React from 'react';
import './requisites.scss';
import Navigation from '../../Navigation/Navigation';
import { Link } from 'react-router-dom';


import { useTranslation } from 'react-i18next';

const Requisites = () => {

  const { t } = useTranslation();

  return (
    <div className='docs'>
      <Navigation title={t("props")} nav2={t("docs")} nav3={t("props")}/>
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
          <div className="docs__items">
            <h1 className="props__title">Наши реквизиты</h1>
            <p className="props__item">ТОО “KAZCOP”</p>
            <p className="props__item">Адрес: Казахстан, Алматы, ул. Тулебаева 117</p>
            <p className="props__item">БИН</p>
            <p className="props__item">Счет</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requisites;
