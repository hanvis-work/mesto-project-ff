const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
export function createCard(item, removeCard, openImage, handleLike) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;

  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = item.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', removeCard);
  
  cardImage.addEventListener('click', () => openImage(item));

  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  cardLikeBtn.addEventListener('click', () => handleLike(cardLikeBtn));

  return cardElement;
}

// Функция удаления карточки
export const removeCard = (e) => {
  e.target.closest('.card').remove();
}

// Функция лайка карточки
export const handleLike = (e) => {
  e.classList.toggle('card__like-button_is-active');
}