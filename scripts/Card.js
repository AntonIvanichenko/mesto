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
      const elementTitle = this.newCard.querySelector('.element__title');
      elementTitle.textContent = this._placeName;
      const elementImage = this.newCard.querySelector('.element__image');
      elementImage.src = this._imageSrc;
      elementImage.setAttribute('alt', elementTitle.textContent); //присваиваем атрибуту alt название места
   }

   _handleCardLikeButton() {
      elementLikeButton.classList.toggle('element__button_theme_dark');
   }

   _handleDeleteCard() {
      elementsBlock.removeChild(this.newCard);
   }

   _handleViewCardImage() {
      const imageBlock = document.querySelector('.popup_image_open'); //открываем по клику картинку
      const imageBlockPic = imageBlock.querySelector('.image-block__image');
      const imageBlockText = imageBlock.querySelector('.image-block__text');
      imageBlockPic.src = elementImage.src; //присваиваем открываемому изображению адресс изображения карточки
      imageBlockText.textContent = elementTitle.textContent;//подпись к изображению

      openPopup(imageBlock);
   }

   // _setListeners() {
   //    const elementLikeButton = this.newCard.querySelector('.element__button');//обработчик лайков
   //    elementLikeButton.addEventListener('click', this._handleCardLikeButton);

   //    const elementDeleteButton = this.newCard.querySelector('.element__delete-button');//удаление карточек
   //    elementDeleteButton.addEventListener('click', () => this._handleDeleteCard());

   //    elementImage.addEventListener('click', () => this._handleViewCardImage);
   // }

   createCard() {
      this._newCard = this._getTemplate();
      this._setData;
      // this._setListeners();

      return this._newCard;
   }
}



