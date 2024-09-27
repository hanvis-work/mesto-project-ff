const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-23',
  headers: {
    authorization: '7ac94989-3f60-42ae-a7ea-60408bb939a4',
    'Content-Type': 'application/json'
  }
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

// Загрузка данных пользователя с сервера
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
  .then(handleResponse)
  .catch((err) => {
    console.log(err);
  }); 
};

// Загрузка карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(handleResponse)
  .catch((err) => {
    console.log(err);
  }); 
};

// Редактирование профиля
export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name, 
      about: about
    })
  })
  .then(handleResponse)
  .catch((err) => {
    console.log(err);
  }); 
};

//  Добавление новой карточки
export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name, 
      link: link
    })
  })
  .then(handleResponse)
  .catch((err) => {
    console.log(err);
  }); 
};

// Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
  .catch((err) => {
    console.log(err);
  }); 
};

// Постановка лайка
export const likeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(handleResponse)
  .catch((err) => {
    console.log(err);
  }); 
};

// Cнятие лайка
export const unlikeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(handleResponse)
  .catch((err) => {
    console.log(err);
  }); 
};

//  Обновление аватара пользователя
export const editAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
      })
  })
  .then(handleResponse)
  .catch((err) => {
    console.log(err);
  }); 
};