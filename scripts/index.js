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

const elementsBlock = document.querySelector('.elements');
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

class Card {
   constructor(item) {
      this._placeName = item.name;
      this._imageSrc = item.link;
   }

   _getTemplate() {
      const newTemplate = document
         .querySelector("#template")
         .content.querySelector(".element")
         .cloneNode(true);

      return newTemplate;
   }

   _setData() {
      const elementTitle = this._newCard.querySelector('.element__title');
      elementTitle.textContent = this._placeName;
      const elementImage = this._newCard.querySelector('.element__image');
      elementImage.src = this._imageSrc;
      elementImage.setAttribute('alt', elementTitle.textContent); //присваиваем атрибуту alt название места
   }

   _handleCardLikeButton(evt) {
      evt.target.classList.toggle('element__button_theme_dark');
   }

   _handleDeleteCard() {
      elementsBlock.removeChild(this._newCard);
   }

   _handleViewCardImage() {
      const imageBlock = document.querySelector('.popup_image_open'); //открываем по клику картинку
      const imageBlockPic = imageBlock.querySelector('.image-block__image');
      const imageBlockText = imageBlock.querySelector('.image-block__text');
      imageBlockPic.src = this._imageSrc; //присваиваем открываемому изображению адресс изображения карточки
      imageBlockText.textContent = this._placeName;//подпись к изображению

      openPopup(imageBlock);
   }

   _setListeners() {
      const cardLikeButton = this._newCard.querySelector('.element__button');//обработчик лайков
      cardLikeButton.addEventListener('click', this._handleCardLikeButton);

      const cardDeleteButton = this._newCard.querySelector('.element__delete-button');//удаление карточек
      cardDeleteButton.addEventListener('click', () => this._handleDeleteCard());

      const cardMainImage = this._newCard.querySelector('.element__image');
      cardMainImage.addEventListener('click', () => this._handleViewCardImage());
   }

   createCard() {
      this._newCard = this._getTemplate();
      this._setData();
      this._setListeners();

      return this._newCard;
   }
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