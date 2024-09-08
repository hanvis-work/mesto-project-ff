// Подключение стилей
import './pages/index.css';

// Подключение компонентов
import { initialCards } from './components/cards';
import { createCard, removeCard, handleLike } from './components/card';
import { closeModal, openModal } from './components/modal';

// Необходимые переменные
const placesList = document.querySelector('.places__list');

const addCardBtn = document.querySelector('.profile__add-button');
const cardModal = document.querySelector('.popup_type_new-card');

const editProfileBtn = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('.popup_type_edit');

const imageModal = document.querySelector('.popup_type_image');
const imageItem = document.querySelector('.popup__image');
const imageDesc = document.querySelector('.popup__caption');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editForm = document.querySelector('.popup__form[name=edit-profile]');
const editNameInput = editForm.elements.name;
const editJobInput = editForm.elements.description;

const placeForm = document.querySelector('.popup__form[name=new-place]');
const placeNameInput = placeForm.elements['place-name'];
const placeLinkInput = placeForm.elements.link;

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
const handleFormSubmit = (e) => {
  e.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileDescription.textContent = editJobInput.value;

  closeModal(editProfileModal);
};
editForm.addEventListener('submit', handleFormSubmit);

// функция создания новой карточки
const handleCardSubmit = (e) => {
  e.preventDefault();

  const item = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  };

  placesList.prepend(createCard(item, removeCard, openImage, handleLike));

  placeNameInput.value = '';
  placeLinkInput.value = '';

  closeModal(cardModal);
};
placeForm.addEventListener('submit', handleCardSubmit);

// Вывести карточки на страницу
initialCards.forEach((item) => {
  const cardElement = createCard(item, removeCard, openImage, handleLike);

  placesList.appendChild(cardElement);
});