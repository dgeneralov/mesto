const enableValidation = (object) => {
    // Найдём все формы с указанным классом в DOM, 
    // сделаем из них массив методом Array.from 
    const formList = Array.from(document.querySelectorAll(object.form));

    // Переберём полученную коллекцию 
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение 
            evt.preventDefault();
        });

        // Для каждой формы вызовем функцию setEventListeners, 
        // передав ей элемент формы 
        setEventListeners(formElement, object);
    });
};

const setEventListeners = (formElement, object) => {
    // Находим все поля внутри формы, 
    // сделаем из них массив методом Array.from 
    const inputList = Array.from(formElement.querySelectorAll(object.input)),
        buttonElement = formElement.querySelector(object.submitButton);

    // Обойдём все элементы полученной коллекции 
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input 
        inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid, 
            // передав ей форму и проверяемый элемент 
            isValid(formElement, inputElement, object);
            toggleButtonState(inputList, buttonElement, object);
        });
    });
};

const isValid = (formElement, inputElement, object) => {
    if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку 
        showInputError(formElement, inputElement, inputElement.validationMessage, object);
    } else {
        // Если проходит, скроем 
        hideInputError(formElement, inputElement, object);
    }
};

const toggleButtonState = (inputList, buttonElement, object) => {
    // Если есть хотя бы один невалидный инпут 
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной 
        buttonElement.classList.add(object.innactiveButton);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        // иначе сделай кнопку активной 
        buttonElement.classList.remove(object.innactiveButton);
        buttonElement.removeAttribute('disabled', 'disabled');
    }
};

const showInputError = (formElement, inputElement, errorMessage, object) => {
    // Находим элемент ошибки внутри самой функции 
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же 
    inputElement.classList.add(object.inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(object.spanError);
};

const hideInputError = (formElement, inputElement, object) => {
    // Находим элемент ошибки 
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же 
    inputElement.classList.remove(object.inputError);
    errorElement.classList.remove(object.spanError);
    errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some 
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true 
        // Обход массива прекратится и вся фунцкция 
        // hasInvalidInput вернёт true 

        return !inputElement.validity.valid;
    })
};

// Вызовем функцию 
enableValidation({
    form: '.popup__container',
    submitButton: '.popup__button',
    innactiveButton: 'popup__button_inactive',
    input: '.popup__input',
    inputError: 'popup__input_error',
    spanError: 'popup__input_error-active'
});