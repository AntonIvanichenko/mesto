export class FormValidator {
   constructor(data, form) {
      this._formSelector = data.formSelector;
      this._inputSelector = data.inputSelector;
      this._submitButtonSelector = data.submitButtonSelector;
      this._inactiveButtonClass = data.inactiveButtonClass;
      this._inputErrorClass = data.inputErrorClass;
      this._formElement = form;
      this._buttonElement = form.querySelector(data.submitButtonSelector);
      this._inputList = Array.from(form.querySelectorAll(data.inputSelector));
   }

   _showErrorMessag(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
   }

   _hideErrorMessage(inputElement) {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = '';
   }

   _checkFieldValidity(inputElement) {
      const errorMessage = inputElement.validationMessage;

      if (!inputElement.validity.valid) {
         this._showErrorMessag(inputElement, errorMessage);
      } else {
         this._hideErrorMessage(inputElement);
      }
   }

   _hasInvalidField() {

      return this._inputList.some((inputElement) => {
         return !inputElement.validity.valid;
      });
   }

   _toggleButtonState() {
      if (this._hasInvalidField()) {
         this._buttonElement.classList.add(this._inactiveButtonClass);
         this._buttonElement.setAttribute("disabled", "disabled");
      } else {
         this._buttonElement.classList.remove(this._inactiveButtonClass);
         this._buttonElement.removeAttribute("disabled");
      }
   }

   _setEventListeners(inputElement) {

      inputElement.addEventListener('input', () => {
         this._checkFieldValidity(inputElement);
         this._toggleButtonState();
      });
   }

   ressetError() {

      this._inputList.some((inputElement) => {
         const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
         inputElement.classList.remove(this._inputErrorClass);
         errorElement.textContent = '';
      });
   }

   enableValidation() {

      this._inputList.forEach((inputElement) => {
         this._setEventListeners(inputElement);
      });

      this._toggleButtonState();
   }
}