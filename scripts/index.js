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

const imageBlock = document.querySelector('.popup_image_open'); //открываем по клику картинку
const imageBlockPic = imageBlock.querySelector('.image-block__image');
const imageBlockText = imageBlock.querySelector('.image-block__text');

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


function createCard(placeName, imageSrc) { //функция с логикой создания новой карточки
   const newCard = elementBlock.cloneNode(true);

   const elementTitle = newCard.querySelector('.element__title');
   elementTitle.textContent = placeName;//
   const elementImage = newCard.querySelector('.element__image');
   elementImage.src = imageSrc;
   elementImage.setAttribute('alt', elementTitle.textContent); //присваиваем атрибуту alt название места

   const elementLikeButton = newCard.querySelector('.element__button');//обработчик лайков
   elementLikeButton.addEventListener('click', function () {
      elementLikeButton.classList.toggle('element__button_theme_dark');
   });

   const elementDeleteButton = newCard.querySelector('.element__delete-button');//удаление карточек
   elementDeleteButton.addEventListener('click', function () {
      elementsBlock.removeChild(newCard);
   });


   elementImage.addEventListener('click', function () {

      imageBlockPic.src = elementImage.src; //присваиваем открываемому изображению адресс изображения карточки
      imageBlockText.textContent = elementTitle.textContent;//подпись к изображению

      openPopup(imageBlock);
   });

   return newCard;
}


initialCards.forEach(function (item) { //цикл выбора элементов массива, добавление новых карточек
   const arrCards = createCard(item.name, item.link);
   elementsBlock.prepend(arrCards);
});


function addCard(evt) { //функция добавления новых карточек пользователем
   evt.preventDefault();

   const userCard = createCard(сardPlaceInput.value, сardImageInput.value);
   elementsBlock.prepend(userCard);
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