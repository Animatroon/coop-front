import React, { useState, useEffect } from 'react';

import Navigation from "../../Navigation/Navigation";

import axios from '../../../axios';

import styles from'./ocup.module.scss';

const ListItem = ({ item, index }) => {
    const listItemNumber = index + 1;

    return (
        <li className={styles.list__item}>
            <div className={styles.list__content}>
                <span className={styles.list__id}>№{listItemNumber}</span>
                <p className={styles.list__text}>{item.title}</p>
            </div>
            <div className={styles.list__line}></div>
        </li>
    );
};
const Ocup = () => {

    const [ocupData, setOcupData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/catalog/inostrannye_okupy/all/`);
          setOcupData(response.data);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      };
      fetchData();
    }, []);


    return (
        <div className={styles.ocup}>
            <Navigation suptitle={"НАШИ РЕЕСТРЫ"} title={"ИНОСТРАННЫЕ ОКУПы"} nav2={"Каталог"}/>
            <div className={`${styles.ocup__inner} box`}>

            <h2 className={styles.ocup__title}>КАТАЛОГИ ИНОСТРАННЫХ ОКУПОВ ПЕРЕДАННЫЕ В УПРАВЛЕНИЕ</h2>

            <ul className={styles.ocup__info}>
                {ocupData.map((item, index) => (
                    <ListItem key={item.id} item={item} index={index} />
                ))}
            </ul>
            </div>
        </div>
    );
}

export default Ocup;

