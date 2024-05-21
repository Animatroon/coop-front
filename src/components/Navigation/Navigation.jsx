import React from 'react';
import styles from './navigation.module.scss';
import { Navi } from "../Global/Images.jsx";
import { useTranslation } from 'react-i18next';

const Navigation = ({ suptitle, title, nav1, nav2, nav3 }) => {

    const {t} = useTranslation();
    let content;
    if (nav1) {
        content = (
            <div className={styles.navigation__container}>
                <div className={`${styles.navigation__down} box}`}>
                    <span>{nav1}</span>
                </div>
            </div>
        );
    } else if (nav2 && !nav3) {
        content = (
            <div className={styles.navigation__container}>
                <div className={`${styles.navigation__down} box`}>
                    <span>{t("main")}</span> <img src={Navi.nav} alt="" /> <span>{nav2}</span>
                </div>
            </div>
        );
    } else if (nav3) {
        content = (
            <div className={styles.navigation__container}>
                <div className={`${styles.navigation__down} box`}>
                    <span>Главная</span> <img src={Navi.nav} alt="" /> <span>{nav2}</span> <img src={Navi.nav} alt="" /> <span>{nav3}</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className={styles.navigation}>
            <div className={styles.navigation__container}>
                <div className={`${styles.navigation__up} box`}>
                    <h2 className={styles.navigation__suptitle}>{suptitle}</h2>
                    <h1 className={styles.navigation__title}>{title}</h1>
                </div>
            </div>
            {content}
        </div>
    );
}

export default Navigation;
