// Функция закрытия модалки по ESC
const closeByEsc = (e) => {
  const openedModal = document.querySelector('.popup_is-opened');
  if (e.code === 'Escape' && openedModal) {
    closeModal(openedModal);
  }
}

// Функция открытия модалки
export const openModal = (modal) => {
  modal.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

// Функция закрытия модалки
export const closeModal = (modal) => {
  modal.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEsc);
}