export default class FormValidator {
  constructor(valParams, formElement) {
    this._valParams = valParams;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._valParams.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._valParams.inputSelector));
  }

  /**показать и скрыть сообщение об ошибке*/
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._valParams.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._valParams.inputErrorActive);
  }
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._valParams.inputErrorClass);
    errorElement.classList.remove(this._valParams.inputErrorActive);
    errorElement.textContent = '';
  }

  /**проверить валидность поля*/
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /**проверить массив полей*/
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  /**блокировать и активировать кнопку "Сохранить"*/
  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.removeAttribute('disabled');
    }
  }

  /**очистить ошибки валидации*/
  clearValidation() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }
}