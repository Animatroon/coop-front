import React, { useState, useEffect } from 'react';
import styles from './docs.module.scss';
import Navigation from '../../Navigation/Navigation';
import axios from '../../../axios';
import { useTranslation } from 'react-i18next';

const Items = ({ docs }) => {
  const downloadDocument = (fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`${styles.docs__item} ${docs.type}`}>
      <h3 className={styles.docs__title}>{docs.title}</h3>
      <span className={styles.docs__subtitle}>{docs.label}</span>
      <div className={styles.docs__downloads}>Документы: <a onClick={() => downloadDocument(docs.file)} download>Загрузить</a></div>
    </div>
  );
};

const Docs = () => {

  const [currentType, setCurrentType] = useState('');

  const { t } = useTranslation();

  const [docData, setDocData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/doc/all/`);
          setDocData(response.data);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
          setDocData([]);
        }
      };
      fetchData();
    }, []);

    const handleFilterChange = (type) => {
      setCurrentType(type);
    };

    console.log(docData);
  return (
    <div className={styles.docs}>
      <Navigation title={t("docs")} nav2={t("docs")} />
      <div className={`box ${styles.docs__inner}`}>
        <p className={styles.docs__text}>{t("docs.text")}</p>
        <div className={styles.docs__content}>
        <div className={styles.docs__sidebar}>
          <p className={styles.sidebar__title} onClick={() => handleFilterChange('org_doc')}>{t("docs.filter1")}</p>
          <div className={styles.sidebar__line}></div>
          <p className={styles.sidebar__title} onClick={() => handleFilterChange('template')}>{t("docs.filter2")}</p>
          <div className={styles.sidebar__line}></div>
          <p className={styles.sidebar__title} onClick={() => handleFilterChange('org_activity')}>{t("docs.filter3")}</p>
        </div>
        <div className={styles.docs__items}>
          {docData.filter(docs => currentType === '' || docs.type === currentType).map(docs => (
            <Items key={docs.id} docs={docs} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
