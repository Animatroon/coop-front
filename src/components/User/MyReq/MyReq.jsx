import React, {useState, useEffect} from 'react';
import Navigation from '../../Navigation/Navigation';
import { Personal } from '../../Global/Images';

import axios from '../../../axios';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './myreq.module.scss';

import Search from '../../Search/Search';

const Req = ({ item, index }) => {
    const listItemNumber = index + 1;
    
    const dateObj = new Date(item.created_at);
    const formattedDate = dateObj.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const categoryLabels = {
        accounting: 'Бухгалтерия',
        other: 'Прочее',
        agreement: 'Договор'
    };
    
    const categoryName = categoryLabels[item.category] || '';
    return (
        <tr>
        <td>{listItemNumber}</td>
        <td>{formattedDate}</td>
        <td>{item.subject}</td>
        <td>{categoryName}</td>
        <td><a className={styles.req__open} href="#d">Открыть</a></td>

    </tr>  
    )
}


const MyReq = () => {

    const { t } = useTranslation();

    const [reqData, setReqData] = useState([]);

    const user = useSelector(state => state.auth.data);
    useEffect(() => {
        const fetchData = async () => {
          if (user?.email) {
            try {
              const response = await axios.get(`/authorization/get_requestsUser/`, {
                params: { email: user.email }
              });
              setReqData(response.data);
            } catch (error) {
              console.error('Ошибка при получении данных:', error);
              setReqData([]);
            }
          }
        };
        fetchData();
      }, [user?.email]);
      
  return (
    <div className={styles.myreq}>
        <Navigation title={"Мои заявки"} nav1={"ФИО"}/>
        <div className={`${styles.myreq__inner} box`}>

            <div className={styles.sidebar}>
                <Link className={styles.sidebar__title} to={'/account'}><img src={Personal.profile} alt="" />{t("cabinet.nav1")}</Link>
                <div className={styles.sidebar__line}></div>
                <Link className={styles.sidebar__title} to={'/account/newrequest'}><img src={Personal.reqCreate} alt="" />{t("cabinet.nav2")}</Link>
                <div className={styles.sidebar__line}></div>
                <Link className={styles.sidebar__title} to={'/account/myrequest'}><img src={Personal.reqList} alt="" />{t("cabinet.nav3")}</Link>
            </div>

            <div className={styles.myreq__content}>
                <Search className={styles.myreq__search} id='myreq'/>

                <table className={styles.myreq__table}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Дата создания</th>
                            <th>Тема</th>
                            <th>Категория</th>
                            <th></th>
                        </tr>   
                    </thead>
                    <tbody>
                    {reqData.map((item, index) => (
                    <Req key={index} item={item} index={index} />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default MyReq
