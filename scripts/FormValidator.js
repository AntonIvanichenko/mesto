import { elementClasses } from "./index.js";

export class FormValidator {
   constructor(data, form) {
      this._formSelector = data.formSelector;
      this._inputSelector = data.inputSelector;
      this._submitButtonSelector = data.submitButtonSelector;
      this._inactiveButtonClass = data.inactiveButtonClass;
      this._inputErrorClass = data.inputErrorClass;
      this._formElement = form;
   }

   _showErrorMessag(formElement, inputElement) {
      const errorMessage = inputElement.validationMessage;
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
   }

   _hideErrorMessage(formElement, inputElement) {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(elementClasses.inputErrorClass);
      errorElement.textContent = '';
   }

   _checkFieldValidity(inputElement) {
      const formElement = inputElement.closest(this._formSelector);

      if (!inputElement.validity.valid) {
         this._showErrorMessag(formElement, inputElement);
      } else {
         this._hideErrorMessage(formElement, inputElement);
      }
   }

   _hasInvalidField(fieldList) {
      return fieldList.some((fieldElement) => {
         return !fieldElement.validity.valid;
      });
   }

   _toggleButtonState(fieldList, buttonElement) {
      if (this._hasInvalidField(fieldList)) {
         buttonElement.classList.add(this._inactiveButtonClass);
         buttonElement.setAttribute("disabled", "disabled");
      } else {
         buttonElement.classList.remove(this._inactiveButtonClass);
         buttonElement.removeAttribute("disabled");
      }
   }

   _setEventListeners(inputElement, buttonElement, inputList) {

      inputElement.addEventListener('input', () => {
         this._checkFieldValidity(inputElement);
         this._toggleButtonState(inputList, buttonElement);
      });
   }

   enableValidation() {
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

      inputList.forEach((inputElement) => {
         this._setEventListeners(inputElement, buttonElement, inputList);
      });

      this._toggleButtonState(inputList, buttonElement);
   }
}