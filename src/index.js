// Подключение стилей
import './pages/index.css';

let userId = '';
let cards = []; 

// Подключение компонентов
import { createCard, removeCard } from './components/card';
import { closeModal, openModal } from './components/modal';
import { clearValidation, enableValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, editProfile, addCard, likeCard, unlikeCard, editAvatar } from './components/api.js';
import { placesList, addCardBtn, cardModal, editProfileBtn, editProfileModal, imageModal, imageItem, imageDesc, allModals, profileImage, profileTitle, profileDescription, editForm, editNameInput, editJobInput, placeForm, placeNameInput, placeLinkInput, profileAvatarForm, avatarUrl, avatarModal, editProfileSubmitBtn, addCardSubmitBtn, avatarSubmitBtn } from './components/constants.js';

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
  .catch((err) => {
    console.log(err);
  }); 
}

init();

// Валидациия
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

enableValidation(validationConfig);

// Модалка добавления новой карточки
const handleAddCard = () => {
  openModal(cardModal);
};
addCardBtn.addEventListener('click', handleAddCard);

// Модалка редактирования профиля
const handleEditProfile = () => {
  editNameInput.value = profileTitle.textContent;
  editJobInput.value = profileDescription.textContent;

  openModal(editProfileModal);
};
editProfileBtn.addEventListener('click', handleEditProfile);

// Модалка открытия фотографии
const handleOpenImage = ({name, link}) => {
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

  editProfileSubmitBtn.textContent = 'Сохранение...'; 

  editProfile(editNameInput.value, editJobInput.value).then(user => {
    editProfileSubmitBtn.textContent = 'Сохранить';

    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;

    closeModal(editProfileModal);
    clearValidation(editForm, validationConfig);
  })
  .catch((err) => {
    console.log(err);
  }); 
};
editForm.addEventListener('submit', handleProfileFormSubmit);

// функция создания новой карточки
const handleCardSubmit = (e) => {
  e.preventDefault();

  addCardSubmitBtn.textContent = 'Сохранение...'; 
  
  addCard(placeNameInput.value, placeLinkInput.value).then((cardData) => {
    addCardSubmitBtn.textContent = 'Сохранить';

    const newCard = createCard(cardData, userId, removeCard, handleOpenImage, handleLike);
    placesList.prepend(newCard);

    placeNameInput.value = '';
    placeLinkInput.value = '';

    closeModal(cardModal);
    clearValidation(placeForm, validationConfig);
  })
  .catch((err) => {
    console.log(err);
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
    const cardElement = createCard(card, userId, removeCard, handleOpenImage, handleLike);
    placesList.appendChild(cardElement);
  })
}

// Функция лайка карточки
const handleLike = (_id, cardLikeBtn, likeCounter) => {
  const isLiked = cardLikeBtn.classList.contains('card__like-button_is-active');

  if (isLiked) {
    unlikeCard(_id).then(res => {
      likeCounter.textContent = res.likes.length;
      cardLikeBtn.classList.remove('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    likeCard(_id).then(res => {
      likeCounter.textContent = res.likes.length;
      cardLikeBtn.classList.add('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

// редактирование аватара
const handleProfileImage = () => {
  openModal(avatarModal);
};
profileImage.addEventListener('click', handleProfileImage);

const profileAvatarFormSubmit = (e) => {
  e.preventDefault();

  const url = avatarUrl.value;

  avatarSubmitBtn.textContent = 'Сохранение...'; 

  editAvatar(url).then(res => {
    avatarSubmitBtn.textContent = 'Сохранить';

    profileImage.style.backgroundImage = `url('${res.avatar}')`;

    closeModal(avatarModal);
    clearValidation(avatarModal, validationConfig);
  })
  .catch((err) => {
    console.log(err);
  });
};
profileAvatarForm.addEventListener('submit', profileAvatarFormSubmit);