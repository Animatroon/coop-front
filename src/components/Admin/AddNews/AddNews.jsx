import React, { useState } from 'react';

export default function AddNews() {
  const [title, setTitle] = useState('');
  const [mainPhoto, setMainPhoto] = useState(null);
  const [text, setText] = useState('');
  const [additionalPhotos, setAdditionalPhotos] = useState([]);
  const [additionalPhotoTitles, setAdditionalPhotoTitles] = useState([]);

  const handleMainPhotoChange = (event) => {
    setMainPhoto(event.target.files[0]);
  };

  const handleAdditionalPhotosChange = (event) => {
    const files = event.target.files;
    const newAdditionalPhotos = [];
    const newAdditionalPhotoTitles = [];

    for (let i = 0; i < files.length; i++) {
      newAdditionalPhotos.push(files[i]);
      newAdditionalPhotoTitles.push('');
    }

    setAdditionalPhotos(newAdditionalPhotos);
    setAdditionalPhotoTitles(newAdditionalPhotoTitles);
  };

  const handleAdditionalPhotoTitleChange = (index, event) => {
    const newAdditionalPhotoTitles = [...additionalPhotoTitles];
    newAdditionalPhotoTitles[index] = event.target.value;
    setAdditionalPhotoTitles(newAdditionalPhotoTitles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('main_photo', mainPhoto);
    formData.append('text', text);

    try {
      const response = await fetch('https://api.kazcop.kz/api/news/news/add', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        const newsId = responseData.id;

        // Добавление дополнительных фотографий
        for (let i = 0; i < additionalPhotos.length; i++) {
          const additionalFormData = new FormData();
          additionalFormData.append('fk', newsId);
          additionalFormData.append('title', additionalPhotoTitles[i]);
          additionalFormData.append('photo', additionalPhotos[i]);

          await fetch('https://api.kazcop.kz/api/news/additional_photo/add', {
            method: 'POST',
            body: additionalFormData,
          });
        }

        console.log('Новость и дополнительные фотографии успешно добавлены!');
      } else {
        console.error('Ошибка при добавлении новости');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  return (
    <div className='addnews'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="addnews__title"
          placeholder="Заголовок"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
        <input
          type="file"
          onChange={handleMainPhotoChange}
          required
        />
        <textarea
          name="text"
          placeholder="Текст новости"
          value={text}
          onChange={(event) => setText(event.target.value)}
          required
          cols="30"
          rows="10"
        ></textarea>
        <input
          type="file"
          multiple
          onChange={handleAdditionalPhotosChange}
        />
        {additionalPhotos.map((photo, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Заголовок доп. фото"
              value={additionalPhotoTitles[index]}
              onChange={(event) => handleAdditionalPhotoTitleChange(index, event)}
            />
            <input
              type="file"
              onChange={(event) => handleAdditionalPhotosChange(event, index)}
            />
          </div>
        ))}
        <button type="submit">Добавить новость</button>
      </form>
    </div>
  );
}
