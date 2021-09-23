export default class FormValidator {
    constructor(_config) {
        this._config = _config;
        this._formList = Array.from(document.querySelectorAll(this._config.form));
    }
    render() {

        this._getListener();
        //return this._formList;
    }

    _getListener() {
        this._getdefault()
    }

    _getdefault() {
        this._formList.forEach((item) => {
            item.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            this._formElement = item;
            this._setEventListeners();
        });
    }

    _setEventListeners() {
        this._buttonElement = this._formElement.querySelector(this._config.submitButton);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.input));

        this._inputList.forEach((item) => {
            // каждому полю добавим обработчик события input 
            item.addEventListener('input', () => {
                // Внутри колбэка вызовем isValid, 
                // передав ей форму и проверяемый элемент 
                this._inputElement = item
                this._isValid();
                this._toggleButtonState();
            });
            return this._buttonElement
        });
    }

    _isValid() {

        if (!this._inputElement.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку 
            this._showInputError();
        } else {
            // Если проходит, скроем 
            this._hideInputError();
        }
    }

    _toggleButtonState() {
        // Если есть хотя бы один невалидный инпут 
        if (this._hasInvalidInput()) {
            // сделай кнопку неактивной 
            this._buttonElement.classList.add(this._config.innactiveButton);
            this._buttonElement.setAttribute('disabled', 'disabled');
        } else {
            // иначе сделай кнопку активной 
            this._buttonElement.classList.remove(this._config.innactiveButton);
            this._buttonElement.removeAttribute('disabled', 'disabled');
        }
    }

    _showInputError() {

        this._errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
        console.log(this._errorElement)
        console.log(this._inputElement.validationMessage)
            //console.log(this._errorElement)
            // Остальной код такой же 
        this._inputElement.classList.add(this._config.inputError);
        this._errorElement.textContent = this._inputElement.validationMessage;
        this._errorElement.classList.add(this._config.spanError);

        //return this._errorElement;
    }

    _hideInputError() {
        //this._errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
        console.log(this._errorElement)
        console.log(this._inputElement.validationMessage)

        // Остальной код такой же 
        this._inputElement.classList.remove(this._config.inputError);
        this._errorElement.classList.remove(this._config.spanError);
        this._errorElement.textContent = '';
    }

    _hasInvalidInput() {
        this._inputList.some((item) => {
            // Если поле не валидно, колбэк вернёт true 
            // Обход массива прекратится и вся фунцкция 
            // hasInvalidInput вернёт true 
            return !item.validity.valid
        })
    };
};