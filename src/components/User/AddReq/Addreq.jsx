import React, {useState, useEffect} from 'react';
import axios from '../../../axios';
import Navigation from '../../Navigation/Navigation';
import { Personal } from '../../Global/Images';


import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import './addreq.scss';

const AddReq = () => {

    const { t } = useTranslation();
    const user = useSelector(state => state.auth.data);

    const [formData, setFormData] = useState({
        email: "", 
        category: "",
        subject: "",
        description: ""
    });

    useEffect(() => {
        if (user && user.email) {
            setFormData(prevFormData => ({
                ...prevFormData,
                email: user.email
            }));
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };      


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email) {
    alert("Email не указан. Пожалуйста, проверьте ваши учетные данные.");
    return;
  }
  try {
    const response = await axios.post('/authorization/send_request/', formData);
    if (response.status === 200) {

      alert("Ваш запрос успешно отправлен");
    } else {
      alert('Response error:', response.data);
    }
  } catch (error) {
    if (error.response) {
      alert('Ошибка при отправке формы:', error.response.data);
    } else if (error.request) {
      alert('No response received:', error.request);
    } else {
      alert('Error setting up request:', error.message);
    }
  }
};


  return (
    <div className='addreq'>
        <Navigation title={t("cabinet.nav2")} nav1={t("form.lebel1")}/>
        <div className="addreq__inner box">
            <p className="account__text">{t("cabinet.text")}</p>


            <div className="addreq__items">
                <div className="sidebar">
                    <Link className='sidebar__title' to={'/account'}><img src={Personal.profile} alt="" />{t("cabinet.nav1")}</Link>
                    <div className="sidebar__line"></div>
                    <Link className='sidebar__title' to={'/account/newrequest'}><img src={Personal.reqCreate} alt="" />{t("cabinet.nav2")}</Link>
                    <div className="sidebar__line"></div>
                    <Link className='sidebar__title' to={'/account/myrequest'}><img src={Personal.reqList} alt="" />{t("cabinet.nav3")}</Link>
                </div>

                <form className="addreq__content" onSubmit={handleSubmit}>
                    <div className="addreq__head">
                        <div className="addreq__item">
                            <h3 className="addreq__title">Категория</h3>
                            <select required name="category" className='select' value={formData.category} onChange={handleInputChange}>
                                <option disabled value="">Выбрать</option>
                                <option value="accounting">Бухгалтерия</option>
                                <option value="other">Прочее</option>
                                <option value="agreement">Договор</option>
                            </select>
                        </div>
                        <div className="addreq__item">
                            <h3 className="addreq__title">Тема</h3>
                            <input required name="subject" type="text" className="addreq__input" value={formData.subject} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="addreq__descr">
                        <h3 className="addreq__title">Описание</h3>
                        <textarea required className='addreq__textarea' name="description" id="descr" value={formData.description} onChange={handleInputChange}></textarea>
                    </div>
                    <button type="submit" className="addreq__btn">Отправить</button>
                </form>

            </div>
        </div>
    </div>
  )
}

export default AddReq;
