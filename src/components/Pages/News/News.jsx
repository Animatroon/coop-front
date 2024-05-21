import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import './News.scss';

import Navigation from '../../Navigation/Navigation';
import { New } from '../../Global/Images';

import config from '../../../config';
import { fetchNews } from '../../../store/slices/newsSlice';


const Post = ({ postData }) => (
  <div className="post">
    <div className="post__info">
      <img className='post__img' src={`${config.BASE_URL}${postData.main_photo}`} alt="post" />
      <div className="post__date">
        18 марта 2023
      </div>
    </div>
    <div className="post__content">
      <h3 className="post__title">{postData.title}</h3>
      <p className="post__text">{postData.text}</p>
      <Link to={`/news/${postData.id}`} className="post__link">Подробнее <img src={New.arrow} alt="" /></Link>
    </div>
  </div>
);

const News = () => {

  const dispatch = useDispatch();
  const news = useSelector(state => state.news);

  
  useEffect(() => {
    dispatch(fetchNews());
    
  }, []);
  

  return (
    <div className='News'>
      <Navigation suptitle={"Последние события"} title={"Новости"} nav2={"Новости"}/>
      <div className="box">
        {news.items.map(post => (
          <Post key={post.id} postData={post} />
        ))}
      </div>
    </div>
  );
};

export default News;