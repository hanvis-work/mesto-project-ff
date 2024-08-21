// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(item, removeCard) {
  const cardElement = cardTemplate.cloneNode(true);
  
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = item.link;
  cardImage.alt = item.name;
  
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = item.name;
  
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', removeCard);

  return cardElement;
}

// @todo: Функция удаления карточки

function removeCard(event) {
  event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach(function(itemData) {
  const cardElement = createCard(itemData, removeCard);
  placesList.appendChild(cardElement);
});