import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../../store/slices/userSlice'; // Подставьте правильный путь к вашему slice
import { Form } from 'react-bootstrap';

import styles from './register.module.scss';
import { Personal } from '../../Global/Images';
import { Button, ButtonGroup } from 'react-bootstrap';
import Navigation from '../../Navigation/Navigation';
import { useTranslation } from 'react-i18next';


const Register = () => {
  const [isConsentGiven, setIsConsentGiven] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsConsentGiven(e.target.checked);
  };

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState('right_owner');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    name_object: '',
    iin: '',
    bin: '',
    iban: '',
  });

  const handleUserTypeChange = (type) => {
    setUserType(type);

    setFormData({
      username: '',
      email: '',
      password: '',
      name: '',
      name_object: '',
      iin: '',
      bin: '',
      iban: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = 'https://api.kazcop.kz/api/authorization/signup/';
    
    const requestData = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      user_type: userType === 'right_owner' ? 'Owner' : 'Customer',
      iban: formData.iban, 
    };
  
    
    if (userType === 'right_owner') {
      requestData.name = formData.name;
      requestData.iin = formData.iin;
    } else {
      requestData.name_object = formData.name_object;
      requestData.bin = formData.bin;
    }
  
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': 'your-csrf-token',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        dispatch(setUserData({ email: formData.email, token: responseData.token, id: responseData.id }));
        alert('Регистрация прошла успешно!');
      } else {
        const errorData = await response.json();
        alert('Ошибка данных пользователя:', errorData);
      }
    } catch (error) {
      alert('Ошибка сервера:', error);
    }
  };
  
  
  

  return (
    <div className={styles.register}>
      <Navigation title={t("register")} nav1={t("form.lebel1")} />
      <div className={styles.register__inner}>
        <div className={styles.register__header}>
          <img className={styles.register__img} src={Personal.profile} alt="Registration" />
          <ButtonGroup className={styles.usertype}>
            <Button onClick={() => handleUserTypeChange('right_owner')} className={`${styles.userButton} ${userType === 'right_owner' ? styles.active : ''}`}>{t("register.role1")}</Button>
            <Button onClick={() => handleUserTypeChange('user')} className={`${styles.userButton} ${userType === 'user' ? styles.active : ''}`}>{t("register.role2")}</Button>
          </ButtonGroup>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="  ">
            <div className={styles.input__form}>
              <div className={styles.input__items}>
                <input
                  type="text"
                  name="username"
                  className={styles.register__username}
                  placeholder={userType === 'right_owner' ? 'Логин' : 'Название пользователя'}
                  value={formData.username}
                  required
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name={userType === 'right_owner' ? 'name' : 'name_object'}
                  className={styles.register__fullname}
                  placeholder={userType === 'right_owner' ? 'ФИО' : 'Название ИП/TOO'}
                  value={userType === 'right_owner' ? formData.name : formData.name_object}
                  required
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.input__items}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  required
                  onChange={handleInputChange}
                />
                {userType === 'right_owner' && (
                  <input
                    type="text"
                    name="iin"
                    className={styles.register__fullname}
                    placeholder="ИИН"
                    value={formData.iin}
                    required
                    onChange={handleInputChange}
                  />
                )}
                {userType === 'user' && (
                  <input
                    type="text"
                    name="bin"
                    className={styles.register__fullname}
                    placeholder="БИН"
                    value={formData.bin}
                    required
                    onChange={handleInputChange}
                  />
                )}
                <input
                  type="text"
                  name="iban"
                  className={styles.register__iban}
                  placeholder="Номер счета"
                  value={formData.iban}
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div> {/* input__form */}
          </div>

          <Form.Check
            type="checkbox"
            id="comfirm"
            className='check'
            onChange={handleCheckboxChange}
            label="Я согласен на обработку персональных данных"
          />
          <button className={styles.register__agree} type="submit" disabled={!isConsentGiven} >{t("register.submit")}</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
