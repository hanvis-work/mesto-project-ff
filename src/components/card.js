import { deleteCard } from './api.js'

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(cardData, userId, removeCard, handleOpenImage, handleLike) {
  const { name: cardName, link: cardLink, likes, owner } = cardData;

  const cardElement = cardTemplate.cloneNode(true).querySelector('.card');

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardLink;
  cardImage.alt = cardName;

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = cardName;

  const deleteButton = cardElement.querySelector('.card__delete-button');

  if (owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      removeCard(cardData._id, cardElement); 
    });
  } else {
    deleteButton.remove();
  }
  
  cardImage.addEventListener('click', () => handleOpenImage(cardData));

  const likeCounter = cardElement.querySelector('.card__like-counter');

  if (likes.length > 0) {
    likeCounter.textContent = likes.length;
  } else {
    likeCounter.textContent = 0;
  }

  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const isLiked = likes.some(({ _id }) => _id === userId)

  if (isLiked) {
    cardLikeBtn.classList.toggle('card__like-button_is-active');
  }

  cardLikeBtn.addEventListener('click', () => handleLike(cardData._id, cardLikeBtn, likeCounter));

  return cardElement;
}

// Функция удаления карточки
export const removeCard = (cardDataId, templateCard) => {
  deleteCard(cardDataId).then(() => {
    templateCard.remove();
  })
  .catch((err) => {
    console.log(err);
  });
}