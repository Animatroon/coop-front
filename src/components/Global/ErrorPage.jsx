import './global.scss';

import React from 'react';

const ErrorPage = () => {
  return (
    <div className='error'>
      <h1>404: Страница не найдена</h1>
      <p>К сожалению, запрашиваемая страница не найдена.</p>
      <a href="/">Вернуться на главную страницу</a>
    </div>
  );
};

export default ErrorPage;