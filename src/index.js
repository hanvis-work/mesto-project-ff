// Подключение стилей
import './pages/index.css';

let userId = '';
let cards = []; 

// Подключение компонентов
import { createCard, removeCard } from './components/card';
import { closeModal, openModal } from './components/modal';
import { clearValidation, enableValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, editProfile, addCard, likeCard, unlikeCard, editAvatar } from './components/api.js';

// Необходимые переменные
const placesList = document.querySelector('.places__list');

const addCardBtn = document.querySelector('.profile__add-button');
const cardModal = document.querySelector('.popup_type_new-card');

const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');

const imageModal = document.querySelector('.popup_type_image');
const imageItem = document.querySelector('.popup__image');
const imageDesc = document.querySelector('.popup__caption');

const allModals = document.querySelectorAll('.popup');

const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editForm = document.querySelector('.popup__form[name=edit-profile]');
const editNameInput = editForm.elements.name;
const editJobInput = editForm.elements.description;

const placeForm = document.querySelector('.popup__form[name=new-place]');
const placeNameInput = placeForm.elements['place-name'];
const placeLinkInput = placeForm.elements.link;

const profileAvatarForm = document.querySelector('.popup__form[name=avatar-img]');
const avatarUrl = document.querySelector('#avatar-url');
const avatarModal = document.querySelector('.popup_type_avatar');

// Загрузка данных пользователя
const init = () => {
  Promise.all([getUserInfo(), getInitialCards()]).then(([user, initialCards]) => {
    profileImage.style.backgroundImage = `url('${user.avatar}')`;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;
    userId = user._id;

    cards = initialCards;
    renderCards();
  })
}

init();

// Валидациия
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

// Модалка добавления новой карточки
addCardBtn.addEventListener('click', () => {
  openModal(cardModal);
});

// Модалка редактирования профиля
editProfileBtn.addEventListener('click', () => {
  editNameInput.value = profileTitle.textContent;
  editJobInput.value = profileDescription.textContent;

  openModal(editProfileModal);
});

// Модалка открытия фотографии
const openImage = ({name, link}) => {
  imageItem.src = link;
  imageItem.alt = name;
  imageDesc.textContent = name;

  openModal(imageModal);
};

// Редактирование профиля
const handleProfileFormSubmit = (e) => {
  e.preventDefault();

  profileTitle.textContent = editNameInput.value;
  profileDescription.textContent = editJobInput.value;

  const btn = e.target.querySelector('.popup__button');
  btn.textContent = 'Сохранение...'; 

  editProfile(editNameInput.value, editJobInput.value).then(user => {
    btn.textContent = 'Сохранить';

    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;

    closeModal(editProfileModal);
    clearValidation(editForm, validationConfig);
  })
};
editForm.addEventListener('submit', handleProfileFormSubmit);

// функция создания новой карточки
const handleCardSubmit = (e) => {
  e.preventDefault();

  const card = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };

  const btn = e.target.querySelector('.popup__button');
  btn.textContent = 'Сохранение...'; 
  
  addCard(placeNameInput.value, placeLinkInput.value).then((cardData) => {
    btn.textContent = 'Сохранить';

    const newCard = createCard(cardData, userId, removeCard, openImage, handleLike);
    placesList.prepend(newCard);

    placeNameInput.value = '';
    placeLinkInput.value = '';

    closeModal(cardModal);
    clearValidation(placeForm, validationConfig);
  });
};
placeForm.addEventListener('submit', handleCardSubmit);

// Закрытие модалок по крестику или оверлею
allModals.forEach((close) => {
  close.addEventListener('click', (e) => {
    const overlay = e.target === e.currentTarget;
    const closeBtn = e.target.classList.contains('popup__close');

    if (closeBtn || overlay) {
      closeModal(close);
    }
  });
});

// Вывести карточки на страницу
const renderCards = () => {
  placesList.innerHTML = "";

  cards.forEach(card => {
    const cardElement = createCard(card, userId, removeCard, openImage, handleLike);
    placesList.appendChild(cardElement);
  })
}

// Функция лайка карточки
const handleLike = (_id, isLiked) => {
  if (isLiked) {
    return unlikeCard(_id).then(res => {
      cards.forEach(card => {
        if (card._id === _id) {
            card.likes = res.likes;
        }
      })

      renderCards();
    })
  } else {
    return likeCard(_id).then(res => {
      cards.forEach(card => {
        if (card._id === _id) {
          card.likes = res.likes;
        }
      })
      
      renderCards();
    })
  }
}

// редактирование аватара
profileImage.addEventListener('click', (e) => {
  e.preventDefault();
  openModal(avatarModal);
});

const profileAvatarFormSubmit = (e) => {
  e.preventDefault();

  const url = avatarUrl.value;

  const btn = e.target.querySelector('.popup__button');
  btn.textContent = 'Сохранение...'; 

  editAvatar(url).then(res => {
    btn.textContent = 'Сохранить';

    profileImage.style.backgroundImage = `url('${res.avatar}')`;

    closeModal(avatarModal);
    clearValidation(avatarModal, validationConfig);
  });
};
profileAvatarForm.addEventListener('submit', profileAvatarFormSubmit);