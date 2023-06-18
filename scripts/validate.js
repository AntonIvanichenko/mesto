const elementClasses = {
   formSelector: '.popup__form',
   inputSelector: '.popup__field',
   submitButtonSelector: '.popup__submit-button',
   inactiveButtonClass: 'popup__submit-button_disabled',
   inputErrorClass: 'popup__field_type_error'
};


const showErrorMessage = (formElement, fieldElement, errorMessage) => { //добавлем ошибку
   const errorElement = formElement.querySelector(`.${fieldElement.id}-error`);
   fieldElement.classList.add(elementClasses.inputErrorClass);
   errorElement.textContent = errorMessage;
};

const hideErrorMessage = (formElement, fieldElement) => { //удаляем ошибку
   const errorElement = formElement.querySelector(`.${fieldElement.id}-error`);
   fieldElement.classList.remove(elementClasses.inputErrorClass);
   errorElement.textContent = '';
};



const checkFieldValidity = (formElement, fieldElement) => {//проверем валидность введенных данных
   if (!fieldElement.validity.valid) {
      showErrorMessage(formElement, fieldElement, fieldElement.validationMessage);
   } else {
      hideErrorMessage(formElement, fieldElement);
   }
};

const hasInvalidField = (fieldList) => { //проверяем на валидность поля, если не валидно вернет true
   return fieldList.some((fieldElement) => {
      return !fieldElement.validity.valid;
   });
};

const toggleButtonState = (fieldList, buttonElement) => { //выключаем кнопку если поля не прошли валидацию
   if (hasInvalidField(fieldList)) {
      buttonElement.classList.add(elementClasses.inactiveButtonClass);
   } else {
      buttonElement.classList.remove(elementClasses.inactiveButtonClass);
   }
};

const setEventListeners = (formElement) => {
   const fieldList = Array.from(formElement.querySelectorAll(elementClasses.inputSelector));
   const buttonElement = formElement.querySelector(elementClasses.submitButtonSelector);
   toggleButtonState(fieldList, buttonElement);
   fieldList.forEach((fieldElement) => {
      fieldElement.addEventListener('input', function () {
         checkFieldValidity(formElement, fieldElement);
         toggleButtonState(fieldList, buttonElement);
      });
   });
};

const enableValidation = () => { //ищем формы, отключаем submit по умолчанию
   const formList = Array.from(document.querySelectorAll(elementClasses.formSelector));

   formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });

      setEventListeners(formElement);
   });
};

enableValidation();