import React, { useState } from 'react';
import styles from './login.module.scss';
import { Link, Navigate } from 'react-router-dom';
import Navigation from '../../Navigation/Navigation';
import { Personal } from '../../Global/Images';

import { useForm } from 'react-hook-form';

import { Cookies } from 'react-cookie';

import { useTranslation } from 'react-i18next';
import { fetchAuth, selectIsAuth } from '../../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';



const Login = () => {

  const cookies = new Cookies();

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const { 
    register, 
    handleSubmit, 
    setError, 
    formState: { errors, isValid},
  } = useForm({
    defaultValues: {
      username: '',
      password: ''
    },
    mode: "onСhange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);

      cookies.set('jwt', data.payload.token, { path: '/' });  
    }
  };

  if (isAuth) {
     return <Navigate to="/" />
  };



  return (
    <div className={styles.login}>
      <Navigation title={t("login.head")} nav1={t("form.lebel1")}/>
      <div className={styles.login__inner}>
        <img className={styles.login__profile} src={Personal.profile} alt="login" />
        <form className={`${styles.login__form} was-validated`} onSubmit={handleSubmit(onSubmit)}>
          <input
            required
            placeholder='Логин'
            type="text"
            className={styles.login__username}
            {...register('username', {required: "Укажите логин"})}
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            placeholder='Пароль'
            type="password"
            className={styles.login__password}
            {...register('password', {required: "Укажите пароль"})}

            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
            <button type="button" className={styles.login__forgot}>{t("forgot")}</button>
            <button type="submit" className={styles.login__enter}>{t("login")}</button>
        </form>
        <Link className={styles.login__register} to='/authorization/signup'>{t("register")}</Link>
      </div>
    </div>
  )
}

export default Login;
