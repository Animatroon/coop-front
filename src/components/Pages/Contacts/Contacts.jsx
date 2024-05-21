import React, { useState } from 'react';
import Navigation from "../../Navigation/Navigation";
import axios from '../../../axios';
import './contacts.scss';
import { Conts } from '../../Global/Images';
import { Form } from 'react-bootstrap';

import  ReCAPTCHA  from "react-google-recaptcha";



const Contacts = () => {

  const [isCaptchaSuccessful, setIsCaptchaSuccess] = useState(false);
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    message: ''
  });

  function onChange(value) {
    setIsCaptchaSuccess(true)
    console.log("captcha value: ", value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleCheckboxChange = (e) => {
  //   setIsConsentGiven(e.target.checked);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (isCaptchaSuccessful) {
      try {
        const response = await axios.post('/contact/add/', formData);
        console.log('Форма успешно отправлена:', response.data);
        alert("Форма успешно отправлена");

      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        alert("Ошибка при отправке формы");
      }
    // } else {
    //   console.error('Captcha не верифицирован');
    // }
  };

  return (
    <div className='contacts'>
        <Navigation title={"Контакты"} nav2={"Контакты"}/>
        <div className="contacts__inner box">
          <div className="contacts__info">
            <ul className="contacts__items">

              <li className="contacts__item">
                <img src={Conts.conts1} alt="phone" />
                <div className="contacts__content">
                  <h5 className="contacts__title">Номер телефона</h5>
                  <a href="tel:+77784177771" className="contacts__phone">+7 778 417 7771</a>
                </div>
              </li>
              <li className="contacts__item">
                <img src={Conts.conts2} alt="phone" />
                <div className="contacts__content">
                  <h5 className="contacts__title">Электронная почта</h5>
                  <a href="mailto:office@kazcop.kz" className="contacts__email">office@kazcop.kz</a>
                </div>
              </li>
              <li className="contacts__item">
                <img src={Conts.conts3} alt="phone" />
                <div className="contacts__content">
                  <h5 className="contacts__title">Наш адрес</h5>
                  <a href="https://go.2gis.com/eqiq9" className="contacts__addr">г. Алматы, ул. Тулебаева 117, офис 2</a>
                </div>
              </li>
            </ul>
            
            <iframe className='contacts__map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1221.8089036660572!2d76.9488025418959!3d43.25209910901177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836e933640aab3%3A0xdfa28d2db2339b07!2z0YPQu9C40YbQsCDQotGD0LvQtdCx0LDQtdCy0LAgMTE3LCDQkNC70LzQsNGC0YsgMDUwMDAw!5e0!3m2!1sru!2skz!4v1712945104293!5m2!1sru!2skz" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <div className="contacts__form">
            <h2 className="form__title">Связаться с нами</h2> 
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__item">
                <span className='form__text'>Ваше имя*</span>
                <input name="name" required className='form__input' type="text" onChange={handleChange} />
              </div>
              <div className="form__item">
                <span className='form__text'>Ваше E-mail*</span>
                <input name="email" required className='form__input' type="text" onChange={handleChange} />
              </div>
              <div className="form__item">
                <span className='form__text'>Ваш тел. номер*</span>
                <input name="telephone" required className='form__input' type="text" onChange={handleChange} />
              </div>
              <div className="form__item">
                <span className='form__text'>Сообщение</span>
                <textarea name="message" className='form__textarea' id="" cols="30" rows="3" onChange={handleChange} ></textarea>
              </div>
              <div className="form__item-comf">

              <div className="g-recaptcha">
              {/* <ReCAPTCHA
              sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
              onChange={onChange}
          /> */}

              </div>
                <Form.Check
                  type="checkbox"
                  id="comfirm"
                  className='check'
                  // onChange={handleCheckboxChange}
                  label="Я согласен на обработку персональных данных"
                />
              </div>
              
              <button className='form__btn' type="submit"  >Отправить</button>
            </form >
          </div>
        </div>
    </div>
  )
}

export default Contacts
