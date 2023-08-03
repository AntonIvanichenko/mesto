import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//поиск элементов в DOM-дереве
const popups = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-icon');
const formsList = document.querySelectorAll('.popup__form');
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
const templateBlock = document.querySelector('#template').content;
const elementBlock = templateBlock.querySelector('.element');

const initialCards = [
   {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
   },
   {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
   },
   {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
   },
   {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
   },
   {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
   },
   {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
   }
];

export const elementClasses = {
   formSelector: '.popup__form',
   inputSelector: '.popup__field',
   submitButtonSelector: '.popup__submit-button',
   inactiveButtonClass: 'popup__submit-button_disabled',
   inputErrorClass: 'popup__field_type_error'
};

function closeByEsc(evt) { //обработчик esc 
   if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
   }
}

const openPopup = (popup) => { //Добавляем класс элементу переданному в качестве аргумента
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

initialCards.forEach(function (item) { //цикл выбора элементов массива, добавление новых карточек
   const arrCards = new Card(item);
   elementsBlock.prepend(arrCards.createCard());
});

function addCard(evt) { //функция добавления новых карточек пользователем
   evt.preventDefault();

   const name = сardPlaceInput.value;
   const link = сardImageInput.value;
   const userCard = new Card({ name, link });
   elementsBlock.prepend(userCard.createCard());
   evt.target.reset();
   evt.submitter.classList.add('popup__submit-button_disabled')
   evt.submitter.disabled = true;
   closePopup(сardAddPopup);
}

formsList.forEach((formElement) => {
   const newValidation = new FormValidator(elementClasses, formElement);
   newValidation.enableValidation();
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
   profilePopupInputName.value = profileTitle.textContent;
   profilePopupInputJob.value = profileParagraph.textContent;
   openPopup(profilePopupBlock);
});

profilePopupForm.addEventListener('submit', handleProfileFormSubmit); //слушатель кнопки "сохранить" формы редактирования профиля

profileCardAddButton.addEventListener('click', function () { //слушатель кнопки "добавить" блока профайл
   openPopup(сardAddPopup);
});

сardAddForm.addEventListener('submit', addCard); //слушатель формы добавления новых карточек пользователем