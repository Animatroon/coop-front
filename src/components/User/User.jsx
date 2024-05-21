import React, { useEffect, useState } from 'react';
import Navigation from "../Navigation/Navigation";
import './user.scss';
import axios from '../../axios';
import { Personal } from '../Global/Images';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, fetchAuthGet, selectIsAuth } from '../../store/slices/userSlice';

import { useTranslation } from 'react-i18next';

import {jwtDecode} from "jwt-decode";

const Modal = ({ isOpen, onClose, id }) => {
    const { t } = useTranslation();

    const [inputValue, setInputValue] = useState('');
  
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };
  
    const handleSubmit = async () => {
        if (inputValue === '') {
            return alert("Напишите пароль");
        }
        try {
    
            const response = await axios.post(
                'https://api.kazcop.kz/api/authorization/change/',
                {"password": inputValue,
                 "id": id},
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': 'IWvemtuJjck7lsWnKa9TKCOGV4nlvvDuSLMJQqs2hiRqvFOCQh616xYyWw75gJWh'
                    }
                }
            );

            setInputValue('');
            onClose();
        } catch (error) {
            console.error('Error:', error);
            alert("Произошла ошибка");
        }
    };
    
  
    return (
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal__overlay" onClick={() => {
        document.body.classList.add('modal-open');
        onClose()
        }}></div>
        <div className="modal__content">
          <h2 className='modal__title'>{t("cabinet.forgot")}</h2>
          <input
            className='modal__input'
            required
            type="text"
            placeholder={t("cabinet.forgot.title")}
            value={inputValue}
            onChange={handleChange}
          />
          <div className="modal__buttons">
            <button className='modal__btn' onClick={handleSubmit}>{t("cabinet.forgot.button")}</button>
            <button className='modal__close' onClick={() => {
            document.body.classList.remove('modal-open');
            onClose()
            }
            }>Отмена</button>
          </div>
        </div>
      </div>
    );
  };



const User = () => {

    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const user = useSelector(state => state.auth.data);

    
    
    const onClickLogout = () => {
        if (window.confirm(t("cabinet.exit.confirm"))) {
            dispatch(logout());
            localStorage.removeItem('token');
            window.location.reload();
        };
    };
      
    useEffect(() => {
        if (isAuth) {
          const jwtToken = localStorage.getItem('token');
          const decodedToken = jwtDecode(jwtToken);
          const data = dispatch(fetchAuthGet(decodedToken.id));
        }
    }, []);;

    if (!isAuth) {
        <Navigate to='/' />
    }
    
    return (
        <div className='account'>
            <Navigation title={t("cabinet")} nav1={t('form.lebel1')} />
            <div className="account__inner box">
                <p className="account__text">{t("cabinet.text")}</p>

                <div className="account__content">
                    <div className="sidebar">
                        <Link className='sidebar__title' to={'/account'}><img src={Personal.profile} alt="" />{t("cabinet.nav1")}</Link>
                        <div className="sidebar__line"></div>
                        <Link className='sidebar__title' to={'/account/newrequest'}><img src={Personal.reqCreate} alt="" />{t("cabinet.nav2")}</Link>
                        <div className="sidebar__line"></div>
                        <Link className='sidebar__title' to={'/account/myrequest'}><img src={Personal.reqList} alt="" />{t("cabinet.nav3")}</Link>
                    </div>

                    <div className="account__info">
                        <img src={Personal.profile} alt="profile" className="account__photo" />

                        <div className="account__items">
                                <div className="account__item">
                                    <h3 className="account__tag">{t("cabinet.item1")}:</h3>
                                    <h3 className="account__tag">{t("cabinet.item2")}:</h3>
                                    <h3 className="account__tag">{t("cabinet.item3")}:</h3>
                                </div>
                            {user && (
                                <div className="account__item">
                                    <p className="account__data">{user.name || user.name_object}</p>
                                    <p className="account__data">{user.contact_number || "Нет данных"}</p>
                                    <p className="account__data">{user.date_joined || "Нет данных"}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="account__btns">
                        <button className='pass__reset' onClick={() => setIsModalOpen(true)}>{t("cabinet.forgot")}</button>
                        <Link to='/'><button className='exit' onClick={ onClickLogout }>{t("cabinet.exit")}</button></Link>
                    </div>
                </div>
            </div>
            {isModalOpen && <Modal id={user.id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default User;
