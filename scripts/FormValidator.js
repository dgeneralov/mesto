export default class FormValidator {
    constructor(_form, _config) {
        this._config = _config;
        this._form = _form;
    }
    render() {
        this._getdefault()
    };

    _getdefault() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    _setEventListeners() {
        this._buttonElement = this._form.querySelector(this._config.submitButton);
        this._inputList = Array.from(this._form.querySelectorAll(this._config.input));

        this._inputList.forEach((item) => {
            // каждому полю добавим обработчик события input 
            item.addEventListener('input', () => {
                // Внутри колбэка вызовем isValid, 
                // передав ей форму и проверяемый элемент 
                this._inputElement = item;
                this._toggleButtonState();
                this._isValid();
            });
        });
        return this._inputElement;
    };

    _isValid() {
        this._errorElement = this._form.querySelector(`.${this._inputElement.id}-error`);
        if (!this._inputElement.validity.valid) {
            // Если поле не проходит валидацию, покажем ошибку 
            this._showInputError();
        } else {
            // Если проходит, скроем 
            this._hideInputError();
        }
    };

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
    };

    _hasInvalidInput() {
        return this._inputList.some((item) => {
            return !item.validity.valid
        })
    };

    _showInputError() {
        this._inputElement.classList.add(this._config.inputError);
        this._errorElement.textContent = this._inputElement.validationMessage;
        this._errorElement.classList.add(this._config.spanError);
    }

    _hideInputError() {
        this._inputElement.classList.remove(this._config.inputError);
        this._errorElement.classList.remove(this._config.spanError);
        this._errorElement.textContent = '';
    }
};