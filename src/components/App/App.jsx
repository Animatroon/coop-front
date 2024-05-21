import React, { useEffect } from 'react';
import {Routes, Route} from 'react-router-dom';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Auth/Register/Register';
import Login from '../Auth/Login/Login';

import Home from '../Pages/Home/Home';
import News from '../Pages/News/News';
import Catalog from '../Pages/Catalog/Catalog';
import Docs from '../Pages/Docs/Docs';
import About from '../Pages/About/About';
import Contacts from '../Pages/Contacts/Contacts';

import Copyholder from '../Pages/Copyholder/Copyholder';
import Reestr from '../Pages/Reestr/Reestr';
import Ocup from '../Pages/Ocup/Ocup';
import FullNews from '../Pages/FullNews/FullNews';
import AddReq from '../User/AddReq/Addreq';
import Accreditation from "../Pages/Accreditation/Accreditation";
import Requisites from '../Pages/Requisites/Requisites';
import Partners from '../Pages/Partners/Partners';

import User from '../User/User';
import MyReq from '../User/MyReq/MyReq';

import AddNews from '../Admin/AddNews/AddNews';

import  ReCAPTCHA  from "react-google-recaptcha";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthGet, selectIsAuth } from '../../store/slices/userSlice';

import {jwtDecode} from "jwt-decode";
import ErrorPage from '../Global/ErrorPage';


function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  
  useEffect(() => {
    dispatch(fetchAuthGet());
  if (isAuth) {
    const jwtToken = localStorage.getItem('token');
    const decodedToken = jwtDecode(jwtToken);
    console.log(decodedToken.id);
    
        const data = dispatch(fetchAuthGet(decodedToken.id));
        console.log(data);
      }
    }, []);;
    



  return <div className="App">
        <Header />
      <Routes>
      <Route index element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="catalogs" element={<Catalog />} />
          <Route path="catalogs/poisk_pravoobladateley" element={<Copyholder />} />
          <Route path="catalogs/reestr" element={<Reestr />} />
          <Route path="catalogs/inostrannye_okupy" element={<Ocup />} />
          <Route path="about/requisites" element={<Requisites />} />
          <Route path="docs" element={<Docs />} />
          <Route path="docs/accreditations" element={<Accreditation />} />
          <Route path="about/partners" element={<Partners />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="about" element={<About />} />
          
          <Route path="account" element={<User />} />
          <Route path="news/:id" element={<FullNews />} />
          <Route path="addnews" element={<AddNews />} />
          <Route path="authorization/signup" element={<Register />} />
          <Route path="authorization/login" element={<Login />} />
          <Route path="account/myrequest" element={<MyReq />} />
          <Route path="account/newrequest" element={<AddReq />} />
          <Route path="*" element={<ErrorPage />} /> 
      </Routes>
      <Footer />
  </div>;
}

export default App;







