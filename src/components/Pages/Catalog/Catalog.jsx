import React from 'react';
import Navigation from "../../Navigation/Navigation";
import { Main } from '../../Global/Images.jsx';
import { useTranslation } from 'react-i18next';

import './catalog.scss';

const Catalog = () => {

  const { t } = useTranslation();


  return (
    <div className='catalog'>
        <Navigation suptitle={t("navi.catalog.suptitle")} title={"Каталог"} nav2={"Каталог"}/>
        <div className="box catalog__inner">
          <div className="catalog__text">
         {t("catalog.text")}
          
          <ul>
            <li>{t("catalog.list1")}</li>
            <li>{t("catalog.list2")}</li>
            <li>{t("catalog.list3")}</li>
            <li>{t("catalog.list4")}</li>
          </ul>
          </div>
          <div className='catalog__content'>
              <a href='/catalogs/poisk_pravoobladateley' className="catalog__item">
              <img className="catalog__images" src={Main.clipboard} alt="" />
                Каталог <br /> правообладателей
              </a>
              <a href='/catalogs/reestr' className="catalog__item">
              <img className="catalog__images" src={Main.list} alt="" />
              Реестр <br /> пользователей
              </a>
              <a href='/catalogs/inostrannye_okupy' className="catalog__item">
              <img className="catalog__images" src={Main.flag} alt="" />
              Иностранные <br /> ОКУПы
              </a>
              <a href='/catalogs/poisk_pravoobladateley' className="catalog__item">
              <img className="catalog__images" src={Main.search} alt="" />
              Поиск <br /> правообладателей
              </a>
          </div>
        </div>
    </div>
  )
}

export default Catalog
