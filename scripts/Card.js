class FormValidator {
   constructor(data, form) {
      this._inputSelector = data.inputSelector;
      this._submitButtonSelector = data.submitButtonSelector;
      this._inactiveButtonClass = data.inactiveButtonClass;
      this._inputErrorClass = data.inputErrorClass;
      this._formElement = form;
   }

   _showErrorMessag(formElement, fieldElement, errorMessage) {
      const errorElement = formElement.querySelector(`.${fieldElement.id}-error`);
      fieldElement.classList.add(elementClasses.inputErrorClass);
      errorElement.textContent = errorMessage;
   }

   _hideErrorMessage(formElement, fieldElement) {
      const errorElement = formElement.querySelector(`.${fieldElement.id}-error`);
      fieldElement.classList.remove(elementClasses.inputErrorClass);
      errorElement.textContent = '';
   }

   _checkFieldValidity(formElement, fieldElement) {
      if (!fieldElement.validity.valid) {
         showErrorMessage(formElement, fieldElement, fieldElement.validationMessage);
      } else {
         hideErrorMessage(formElement, fieldElement);
      }
   }

   _hasInvalidField(fieldList) {
      return fieldList.some((fieldElement) => {
         return !fieldElement.validity.valid;
      });
   }

   _toggleButtonState(fieldList, buttonElement) {
      if (hasInvalidField(fieldList)) {
         buttonElement.classList.add(this._inactiveButtonClass);
         buttonElement.setAttribute("disabled", "disabled");
      } else {
         buttonElement.classList.remove(this._inactiveButtonClass);
         buttonElement.removeAttribute("disabled");
      }
   }

   _setEventListeners(fieldElement, buttonElement) {

      fieldElement.addEventListener('input', function () {
         this._checkFieldValidity(formElement, fieldElement);
         this._toggleButtonState(fieldList, buttonElement);
      });
   }

   enableValidation() {
      const fieldList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

      fieldList.forEach((fieldElement) => {
         this._setEventListeners(fieldElement, buttonElement);
      });

      this._toggleButtonState(fieldList, buttonElement);
   }
}

const formList = document.querySelectorAll('.popup__form');
formList.forEach((formElement) => {
   const newValidation = new FormValidator(elementClasses, formElement);
   newValidation.enableValidation();
});



