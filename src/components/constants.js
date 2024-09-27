// Необходимые переменные
export const placesList = document.querySelector('.places__list');

export const addCardBtn = document.querySelector('.profile__add-button');
export const cardModal = document.querySelector('.popup_type_new-card');

export const editProfileBtn = document.querySelector('.profile__edit-button');
export const editProfileModal = document.querySelector('.popup_type_edit');

export const imageModal = document.querySelector('.popup_type_image');
export const imageItem = document.querySelector('.popup__image');
export const imageDesc = document.querySelector('.popup__caption');

export const allModals = document.querySelectorAll('.popup');

export const profileImage = document.querySelector('.profile__image');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector('.profile__description');
export const editForm = document.querySelector('.popup__form[name=edit-profile]');
export const editNameInput = editForm.elements.name;
export const editJobInput = editForm.elements.description;

export const placeForm = document.querySelector('.popup__form[name=new-place]');
export const placeNameInput = placeForm.elements['place-name'];
export const placeLinkInput = placeForm.elements.link;

export const profileAvatarForm = document.querySelector('.popup__form[name=avatar-img]');
export const avatarUrl = document.querySelector('#avatar-url');
export const avatarModal = document.querySelector('.popup_type_avatar');

export const editProfileSubmitBtn = editForm.querySelector('.popup__button');
export const addCardSubmitBtn = placeForm.querySelector('.popup__button');
export const avatarSubmitBtn = profileAvatarForm.querySelector('.popup__button');