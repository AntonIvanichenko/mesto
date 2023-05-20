//поиск элементов в DOM-дереве
const profileButton = document.querySelector('.profile__button');
const iconeClose = document.querySelector('.popup__close-icon');
const popupBlock = document.querySelector('.popup');
const inputName = document.querySelector('#users-name');
const profileTitle = document.querySelector('.profile__title');
const inputJob = document.querySelector('#users-job');
const profileParagraph = document.querySelector('.profile__paragraph');
const popupForm = document.querySelector('.popup__form');

//Обработчик «отправки» формы, меняем текстовый контент profile 
function handleFormSubmit(evt) {
   evt.preventDefault();

   profileTitle.textContent = inputName.value;
   profileParagraph.textContent = inputJob.value;

   closePopup(popupBlock);
}

//Добавляем класс элементу переданному в качестве аргумента
const openPopup = (parametr) => {
   parametr.classList.add('popup_opened');

   //присваиваем значениям value текстовое содержимое заголовков profile
   inputName.value = profileTitle.textContent;
   inputJob.value = profileParagraph.textContent;
}
//удаляем у элемента класс
const closePopup = (parametr) => {
   parametr.classList.remove('popup_opened');
}

//слушатель кнопки .profile__button, вызов функции openPopup(popupBlock)
profileButton.addEventListener('click', function () {
   openPopup(popupBlock);
});
//слушатель кнопки .popup__close-icon, вызов функции closePopup(popupBlock)
iconeClose.addEventListener('click', function () {
   closePopup(popupBlock);
});
//слушатель действия отправки формы .popup__form, вызов функции handleFormSubmit()
popupForm.addEventListener('submit', handleFormSubmit);