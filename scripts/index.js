import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './initialCards.js';

//поиск элементов в DOM-дереве
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-icon');
const profileButton = document.querySelector('.profile__button');
const profileTitle = document.querySelector('.profile__title');
const profileParagraph = document.querySelector('.profile__paragraph');
const profileCardAddButton = document.querySelector('.profile__add-button');
const profilePopupBlock = document.querySelector('.profile-popup');
const profilePopupForm = document.forms['profile-info-form'];
const profilePopupInputName = document.querySelector('#users-name');
const profilePopupInputJob = document.querySelector('#users-job');

const сardAddPopup = document.querySelector('.popup_card_add');
const сardAddForm = document.forms['profile-card-form'];
const сardPlaceInput = сardAddPopup.querySelector('#place');
const сardImageInput = сardAddPopup.querySelector('#image');
export const elementsBlock = document.querySelector('.elements');

const elementClasses = {
   formSelector: '.popup__form',
   inputSelector: '.popup__field',
   submitButtonSelector: '.popup__submit-button',
   inactiveButtonClass: 'popup__submit-button_disabled',
   inputErrorClass: 'popup__field_type_error',
   buttonElement: '.popup__submit-button',
};

const rofilePopupValidation = new FormValidator(elementClasses, profilePopupForm);
rofilePopupValidation.enableValidation();

function openProfilePopup() {
   rofilePopupValidation.ressetError();
   profilePopupInputName.value = profileTitle.textContent;
   profilePopupInputJob.value = profileParagraph.textContent;
   openPopup(profilePopupBlock);
}

const cardAddValidation = new FormValidator(elementClasses, сardAddForm);
cardAddValidation.enableValidation();

function openCardAddPopup() {
   cardAddValidation.ressetError();
   cardAddValidation.disableSubmitButton();
   openPopup(сardAddPopup);
}

function closeByEsc(evt) { //обработчик esc 
   if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
   }
}

export const openPopup = (popup) => { //Добавляем класс элементу переданному в качестве аргумента, создаем обект валидации
   popup.classList.add('popup_opened');
   document.addEventListener('keydown', closeByEsc);
}

const closePopup = (popup) => { //удаляем у элемента класс
   popup.classList.remove('popup_opened');
   document.removeEventListener('keydown', closeByEsc);
}

function handleProfileFormSubmit(evt) { //Обработчик «отправки» формы, меняем текстовый контент profile 
   evt.preventDefault();

   profileTitle.textContent = profilePopupInputName.value;
   profileParagraph.textContent = profilePopupInputJob.value;
   closePopup(profilePopupBlock);
}

function createCard(info, templateSelector) {
   const newCard = new Card(info, templateSelector);
   return newCard;
}

function addCard(evt) { //функция добавления новых карточек пользователем
   evt.preventDefault();

   const name = сardPlaceInput.value;
   const link = сardImageInput.value;
   const userCard = createCard({ name, link }, '#template');
   elementsBlock.prepend(userCard.createCard());
   evt.target.reset();
   closePopup(сardAddPopup);
}

initialCards.forEach(function (item) { //цикл выбора элементов массива, добавление новых карточек
   const arrCards = createCard(item, '#template');
   elementsBlock.prepend(arrCards.createCard());
});

popupCloseButtons.forEach((button) => { //обработчик крестиков
   const popup = button.closest('.popup');
   button.addEventListener('click', function () {
      closePopup(popup);
   });
});

popups.forEach((popup) => { //обработчик overlay
   popup.addEventListener('click', function (evt) {
      if (evt.target.classList.contains('popup')) {
         closePopup(popup);
      }
   });
});

profileButton.addEventListener('click', function () { //слушатель кнопки открытия формы редактирования профиля
   openProfilePopup();
});

profilePopupForm.addEventListener('submit', handleProfileFormSubmit); //слушатель кнопки "сохранить" формы редактирования профиля

profileCardAddButton.addEventListener('click', function () { //слушатель кнопки "добавить" блока профайл 
   openCardAddPopup();
});

сardAddForm.addEventListener('submit', addCard); //слушатель формы добавления новых карточек пользователем