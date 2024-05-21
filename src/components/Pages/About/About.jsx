import React from 'react';

import styles from './about.module.scss';

import Navigation from '../../Navigation/Navigation';
import { useTranslation } from 'react-i18next';

const About = () => {

  const {t} = useTranslation(); 

  return (
    <div className={styles.about}>
    <Navigation title={"О компании"} nav2={"О компании"}/>
    
  <div className={`${styles.about__inner} box`}>
      <h2 className={styles.about__title}>{t("about.title")}</h2>
      <p className={styles.about__dest}>{t("about.text1")}</p> 
      <p className={styles.about__dest}>{t("about.text2")}</p>
      <p className={styles.about__dest}>{t("about.text3")}</p>
      <p className={styles.about__dest}>{t("about.text4")}</p>
  </div>
    </div>
  )
}

export default About;
