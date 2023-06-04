//поиск элементов в DOM-дереве
const profileButton = document.querySelector('.profile__button');
const popupBlock = document.querySelector('.popup');
const iconeClose = popupBlock.querySelector('.popup__close-icon');
const inputName = document.querySelector('#users-name');
const profileTitle = document.querySelector('.profile__title');
const inputJob = document.querySelector('#users-job');
const profileParagraph = document.querySelector('.profile__paragraph');
const popupForm = popupBlock.querySelector('.popup__form');
const profileAddButton = document.querySelector('.profile__add-button');

const popupCardAdd = document.querySelector('.popup_card_add');
const iconCloseCardAdd = popupCardAdd.querySelector('.popup__close-icon');
const popupFormCardAdd = popupCardAdd.querySelector('.popup__form');


function handleFormSubmit(evt) { //Обработчик «отправки» формы, меняем текстовый контент profile 
   evt.preventDefault();

   profileTitle.textContent = inputName.value;
   profileParagraph.textContent = inputJob.value;

   closePopup(popupBlock);
}


function addCard(placeName, imageSrc) { //создание карточки, функцию вызывается из счетчика массива и слушателя формы добавления карточки
   const elementsBlock = document.querySelector('.elements');/*куда добавляем карточку*/
   const templateBlock = document.querySelector('#template').content;/*находим тэмплэйт в html*/
   const newCard = templateBlock.querySelector('.element').cloneNode(true); //клонируем разметку внутри тэмплэйт

   newCard.querySelector('.element__title').textContent = placeName;
   newCard.querySelector('.element__image').src = imageSrc;
   elementsBlock.prepend(newCard);

   const likeButton = newCard.querySelector('.element__button'); //изменение цвета кнопки "лайк" карточки
   likeButton.addEventListener('click', function () {
      likeButton.classList.toggle('element__button_theme_dark');
   });

   const blockImage = document.querySelector('.popup_image_open'); //открываем по клику картинку
   const imageFromNewCard = newCard.querySelector('.element__image');
   imageFromNewCard.addEventListener('click', function () {
      blockImage.querySelector('.image-block__image').src = newCard.querySelector('.element__image').src;
      blockImage.querySelector('.image-block__text').textContent = newCard.querySelector('.element__title').textContent;

      openPopup(blockImage);
   });

   const blockImageCloseIcon = blockImage.querySelector('.popup__close-icon'); //закрываем картинку
   blockImageCloseIcon.addEventListener('click', function () {
      closePopup(blockImage);
   });

   const deleteButton = newCard.querySelector('.element__delete-button'); //удаление карточки
   deleteButton.addEventListener('click', function () {
      elementsBlock.removeChild(newCard);
   });
}


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



initialCards.forEach(function (item) { //добавляем карточки с данными из массива
   addCard(item.name, item.link);
});


function addUserCard(evt) { //функция добавления новых карточек пользователем
   evt.preventDefault();

   const inputPlace = popupCardAdd.querySelector('#place');
   const inputImage = popupCardAdd.querySelector('#image');

   addCard(inputPlace.value, inputImage.value);
   evt.target.reset();
   closePopup(popupCardAdd);
}


const openPopup = (parametr) => { //Добавляем класс элементу переданному в качестве аргумента
   parametr.classList.add('popup_opened');

   if (parametr === popupBlock) {
      inputName.value = profileTitle.textContent;
      inputJob.value = profileParagraph.textContent;
   };
}


const closePopup = (parametr) => { //удаляем у элемента класс
   parametr.classList.remove('popup_opened');
}


profileButton.addEventListener('click', function () { //слушатель кнопки .profile__button
   openPopup(popupBlock);
});

iconeClose.addEventListener('click', function () { //слушатель кнопки .popup__close-icon
   closePopup(popupBlock);
});

popupForm.addEventListener('submit', handleFormSubmit); //слушатель действия отправки формы .popup__form

profileAddButton.addEventListener('click', function () { //слушатель кнопки "добавить" блока профайл
   openPopup(popupCardAdd);
});

iconCloseCardAdd.addEventListener('click', function () { // слушатель иконки "закрыть" блока добавления карточки
   closePopup(popupCardAdd);
});

popupFormCardAdd.addEventListener('submit', addUserCard); //слушатель формы добавления новых карточек пользователем





