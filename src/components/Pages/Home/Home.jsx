import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';


import { Container, Row, Col, ButtonGroup, Button, Form} from 'react-bootstrap';
import { Main } from '../../Global/Images.jsx';
import './home.scss';

import axios from "../../../axios.js";

import { fetchNews } from '../../../store/slices/newsSlice';
import { useResize } from '../../use-resize.js';
import config from "../../../config.js";
import { selectIsAuth } from "../../../store/slices/userSlice.js";








const NewsCard = ({ postData }) => {
  const { t } = useTranslation();

  const { main_photo, title } = postData;
  const day = 18;
  const month = "октябрь";

  function truncateText(text) {
    if (text.length > 39) {
      return text.slice(0, 39) + '......';
    } else {
      return text;
    }
  }

  return (
    <a href="#news1" className="card" style={{backgroundImage: `url(${config.BASE_URL}${main_photo})`}}>
      <h2 className="card__title">{truncateText(title)}</h2>
      <span className='card__link'>{t("home.news.button")}</span>
      <div className="card__date">
        <span className='card__day'>{day}</span>
        <br />
        <span className='card__month'>{month}</span>
      </div>
    </a>
  )
}





const Home = () => {

  
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const news = useSelector(state => state.news);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    telephone: '',
    message: 'from Home'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const response = await axios.post('/contact/add/', formData);
        console.log('Форма успешно отправлена:', response.data);
        alert("Форма успешно отправлена, мы с вами свяжемся в ближайщее время!");

      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        alert("Ошибка при отправке формы");
      }

  };

  const isAuth = useSelector(selectIsAuth);

  const latestThreeNews = news.items.slice(-3);

  const {width} = useResize();

  const contactWidth = 810 * (width / 1920);
  const aboutWidth = 818 * (width / 1920);
  
  useEffect(() => {
    dispatch(fetchNews());

  }, []);
  


    return (
      <div className='Home'>
          <div className="main">
          <Row className='Gcontent'>
          <Col xs={6} className='main__content'>
          <div className="main__item">
            <h3 className="main__suptitle">{t("home.main.suptitle")}</h3>
                <h1 className="main__title">{t("home.main.title")}</h1>
                <ButtonGroup>
                <Link to="contacts"> <Button className='me-4 btn-cons' variant="light">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.9519 1.04712C17.5543 -0.350402 15.2885 -0.350332 13.8911 1.04727L1.94103 12.9987C1.5347 13.4051 1.2491 13.9162 1.116 14.4753L0.0204088 19.0767C-0.0399112 19.3301 0.0355188 19.5966 0.219679 19.7808C0.403849 19.9649 0.670369 20.0404 0.923729 19.98L5.52498 18.8845C6.08418 18.7514 6.59546 18.4656 7.00191 18.0591L16.9995 8.0604C17.6777 8.7442 17.676 9.8484 16.9943 10.5301L15.2109 12.3135C14.918 12.6064 14.918 13.0812 15.2109 13.3741C15.5038 13.667 15.9786 13.667 16.2715 13.3741L18.055 11.5907C19.3224 10.3233 19.3242 8.2693 18.0601 6.99967L18.952 6.10763C20.3493 4.71015 20.3493 2.44453 18.9519 1.04712ZM14.9518 2.10787C15.7634 1.29611 17.0795 1.29607 17.8912 2.10778C18.7028 2.91942 18.7029 4.23534 17.8913 5.04704L5.94119 16.9985C5.73104 17.2087 5.46668 17.3564 5.17755 17.4253L1.76191 18.2385L2.57521 14.8227C2.64402 14.5337 2.79168 14.2694 3.00175 14.0593L14.9518 2.10787Z" fill="#13559F"/>
                  </svg>
                  {t("home.main.button.consultation")}</Button> </Link>
                    
                    {isAuth ? (<Link to="account">
                                  <Button variant="outline-light btn-pers">
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M13.7545 12.0002C14.9966 12.0002 16.0034 13.007 16.0034 14.2491V14.8245C16.0034 15.7188 15.6838 16.5836 15.1023 17.263C13.5329 19.0965 11.1457 20.0013 8.0004 20.0013C4.8545 20.0013 2.46849 19.0962 0.902186 17.2619C0.322416 16.583 0.00390625 15.7195 0.00390625 14.8267V14.2491C0.00390625 13.007 1.01076 12.0002 2.25278 12.0002H13.7545ZM13.7545 13.5002H2.25278C1.83919 13.5002 1.50391 13.8355 1.50391 14.2491V14.8267C1.50391 15.3624 1.69502 15.8805 2.04287 16.2878C3.29618 17.7555 5.26206 18.5013 8.0004 18.5013C10.7387 18.5013 12.7063 17.7555 13.9627 16.2876C14.3117 15.8799 14.5034 15.361 14.5034 14.8245V14.2491C14.5034 13.8355 14.1681 13.5002 13.7545 13.5002ZM8.0004 0.00488281C10.7618 0.00488281 13.0004 2.24346 13.0004 5.00488C13.0004 7.76631 10.7618 10.0049 8.0004 10.0049C5.23894 10.0049 3.00036 7.76631 3.00036 5.00488C3.00036 2.24346 5.23894 0.00488281 8.0004 0.00488281ZM8.0004 1.50488C6.0674 1.50488 4.50036 3.07189 4.50036 5.00488C4.50036 6.93788 6.0674 8.5049 8.0004 8.5049C9.9334 8.5049 11.5004 6.93788 11.5004 5.00488C11.5004 3.07189 9.9334 1.50488 8.0004 1.50488Z" fill="white"/>
                                    </svg>
                                    {t("home.main.button.personal")}
                                  </Button> 
                    </Link> ) : (<Link to="authorization/login">
                                  <Button variant="outline-light btn-pers">
                                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M13.7545 12.0002C14.9966 12.0002 16.0034 13.007 16.0034 14.2491V14.8245C16.0034 15.7188 15.6838 16.5836 15.1023 17.263C13.5329 19.0965 11.1457 20.0013 8.0004 20.0013C4.8545 20.0013 2.46849 19.0962 0.902186 17.2619C0.322416 16.583 0.00390625 15.7195 0.00390625 14.8267V14.2491C0.00390625 13.007 1.01076 12.0002 2.25278 12.0002H13.7545ZM13.7545 13.5002H2.25278C1.83919 13.5002 1.50391 13.8355 1.50391 14.2491V14.8267C1.50391 15.3624 1.69502 15.8805 2.04287 16.2878C3.29618 17.7555 5.26206 18.5013 8.0004 18.5013C10.7387 18.5013 12.7063 17.7555 13.9627 16.2876C14.3117 15.8799 14.5034 15.361 14.5034 14.8245V14.2491C14.5034 13.8355 14.1681 13.5002 13.7545 13.5002ZM8.0004 0.00488281C10.7618 0.00488281 13.0004 2.24346 13.0004 5.00488C13.0004 7.76631 10.7618 10.0049 8.0004 10.0049C5.23894 10.0049 3.00036 7.76631 3.00036 5.00488C3.00036 2.24346 5.23894 0.00488281 8.0004 0.00488281ZM8.0004 1.50488C6.0674 1.50488 4.50036 3.07189 4.50036 5.00488C4.50036 6.93788 6.0674 8.5049 8.0004 8.5049C9.9334 8.5049 11.5004 6.93788 11.5004 5.00488C11.5004 3.07189 9.9334 1.50488 8.0004 1.50488Z" fill="white"/>
                                    </svg>
                                    {t("home.main.button.personal")}
                  </Button></Link>)}
                  
                </ButtonGroup>
          </div>
        </Col>
        </Row>
            
        </div>

      <section className="function">
        <h1 className="title">{t("home.function.suptitle")}</h1>
        <h3 className="subtitle ">{t("home.function.title")}</h3>
        <Container>
          <Row>
          <Col>
            <div className="function-card">
              <img className='function-card__img' src={Main.func1} alt="card" />
              <div className="function__content">
                <h4 className="function-card__title">{t("home.function.item1.title")}</h4>
                <p className="function-card__text">{t("home.function.item1.text")}</p>
              </div>
            </div>

            <div className="function-card">
              <img className='function-card__img' src={Main.func3} alt="card" />
              <div className="function__content">
                <h4 className="function-card__title">{t("home.function.item2.title")}</h4>
                <p className="function-card__text">{t("home.function.item2.text")}</p>
              </div>
            </div>
          </Col>
          <Col>
            <div className="function-card">
              <img className='function-card__img' src={Main.func2} alt="card" />
              <div className="function__content">
                <h4 className="function-card__title">{t("home.function.item3.title")}</h4>
                <p className="function-card__text">{t("home.function.item3.text")}</p>
              </div>
            </div>
            <div className="function-card">
              <img className='function-card__img' src={Main.func4} alt="card" />
              <div className="function__content">
              <h4 className="function-card__title">{t("home.function.item4.title")}</h4>
                <p className="function-card__text">{t("home.function.item4.text")}</p>
              </div>
            </div>
          </Col>
          </Row>
        </Container>
      </section>

      <section className='about'>

        <div className='about__inner'>
          <div className='about__item'>
          <div className="about__content">
            <h1 className="about__title">{t("home.about.title")}</h1>
            <p className="about__text">{t("home.about.text")}</p>
            <a className='about__btn' href="about">{t("about")}</a>

          </div>
          </div>
          <div className='about__item'><img className='about__img' style={{width: `${aboutWidth}px`}} src={Main.about} alt="about" /></div>
        </div>  
      </section>

      <section className="box news">
        <div className="news__header">
          <div className="news__titles">
            <h3 className="suptitle news__suptitle">{t("home.news.suptitle")}</h3>
            <h1 className="title news__title">{t("news")}</h1>
          </div> 
            <Link to="/news" className="news__btn">{t("home.news.button")}</Link>
        </div>
          <div className="news__content">
            {latestThreeNews.map(post => (
              <NewsCard key={post.id} postData={post} />
            ))}
            {/* <NewsCard img={Main.news1} title={"Lorem ipsum dolor sit amet, consectetur............"} day={"18"} month={"марта"}/>
            <NewsCard img={Main.news2} title={"Lorem ipsum dolor sit amet, consectetur............"} day={"11"} month={"мая"}/>
            <NewsCard img={Main.news3} title={"Lorem ipsum dolor sit amet, consectetur............"} day={"3"} month={"августа"}/> */}
          </div>
      </section>
      <section className="contacts">

        <div className='contacts__inners'>
          <Col>
          <iframe className='contacts__img' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1221.8089036660572!2d76.9488025418959!3d43.25209910901177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38836e933640aab3%3A0xdfa28d2db2339b07!2z0YPQu9C40YbQsCDQotGD0LvQtdCx0LDQtdCy0LAgMTE3LCDQkNC70LzQsNGC0YsgMDUwMDAw!5e0!3m2!1sru!2skz!4v1712945104293!5m2!1sru!2skz" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          
          </Col>
          <Col>
              <h3 className="suptitle contacts__suptitle">{t("home.contacts.suptitle")}</h3>
              <h2 className="title contacts__title">{t("home.contacts.title")}</h2>

              <ul className="contacts__links">
                <li className="contacts__link">
                  <img src={Main.cont1} alt="" />
                  <a href="mailto:office@kazcop.kz">office@kazcop.kz</a>
                </li>

                <li className="contacts__link">
                  <img src={Main.cont2} alt="" />
                  <a href="tel:+77784177771">+7 778 417 7771</a>
                </li>

                <li className="contacts__link">
                  <img src={Main.cont3} alt="" />
                  <a href="https://go.2gis.com/eqiq9">г. Алматы, ул. Тулебаева 117, офис 2</a>
                </li>
              </ul>
          </Col>
        </div>

      </section>
      <section className='form'>
        <div className="form__item">
          <h3 className="suptitle form__suptitle">{t("home.form.suptitle")}</h3>
          <h2 className="title form__title">{t("home.form.title")}</h2>
          <p className="fields">*{t("home.form.fields")}</p>
          <Form className='forms' onSubmit={handleSubmit}>
            <Form.Group className="form-group mb-3" controlId='formBasicName'>
              <Form.Label>{t("form.lebel1")}<p className='red'>*</p></Form.Label>
              <Form.Control name="name" required type="text" onChange={handleChange} ></Form.Control>
            </Form.Group>
            <Form.Group className="form-group mb-3" controlId='formBasicPhone'>
              <Form.Label>{t("form.lebel2")}<p className="red">*</p></Form.Label>
              <Form.Control name="telephone" required type="phone" onChange={handleChange} ></Form.Control>
            </Form.Group>
            <Form.Group className="form-group mb-4" controlId='formBasicEmail'>
              <Form.Label>E-MAIL</Form.Label>
              <Form.Control name="email" type="email" onChange={handleChange} ></Form.Control>
            </Form.Group>
            <Button className='form__btn' type="submit">{t("form.button")}</Button>
          </Form>
        </div>
        <div className="form__item">
          <img src={Main.contacts} style={{width: `${contactWidth}px`, height: 'auto'}} alt="contacts" />
        </div>
        

      </section>
  </div>
  )
}

export default Home
