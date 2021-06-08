const

    popupAvatar = document.querySelector(".popup_avatar"),
    popupMesto = document.querySelector(".popup_mesto"),
    popupImage = document.querySelector(".popup_card"),
    mestoName = popupMesto.querySelector(".popup__input_mesto-name"),
    mestoLink = popupMesto.querySelector(".popup__input_mesto-link"),
    popupCloseAvatar = document.querySelector(".popup__close_avatar"),
    popupCloseMesto = document.querySelector(".popup__close_mesto"),
    popupClouseImage = document.querySelector(".popup__close_image"),
    title = document.querySelector(".profile__title"),
    buttonEdit = document.querySelector(".profile__buttons-edit"),
    buttonAdd = document.querySelector(".profile__buttons-add"),
    subtitle = document.querySelector(".profile__subtitle"),
    formAvatar = document.querySelector(".popup__container_avatar"),
    formMesto = document.querySelector(".popup__container_mesto"),
    nameInput = formAvatar.querySelector("#name-input"),
    jobInput = formAvatar.querySelector("#job-input"),
    elements = document.querySelector(".elements"),
    card = elements.querySelector(".card").content,
    cardName = card.querySelector(".elements__title"),
    initialCards = [
        {
            name: 'Архыз',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
        },
        {
            name: 'Челябинская область',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
        },
        {
            name: 'Иваново',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
        },
        {
            name: 'Камчатка',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
        },
        {
            name: 'Холмогорский район',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
        },
        {
            name: 'Байкал',
            link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
        }
    ];


// открываем popup
function openPoup(item) {
    item.classList.add("popup_opened");
}

// open popupMesto
buttonAdd.addEventListener("click", () => {
    const button = popupMesto.querySelector('.popup__button');
    openPoup(popupMesto)
    mestoName.value = "";
    mestoLink.value = "";
    button.setAttribute('disabled', 'disabled');
    button.classList.add('popup__button_inactive');
});

// открываем popupAvatar
buttonEdit.addEventListener("click", () => {
    openPoup(popupAvatar);
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
});

//открываем popupImage
const openPopupImage = (item) => {
    openPoup(popupImage);
    const imgPopup = popupImage.querySelector(".popup__content"),
        imgTitle = popupImage.querySelector(".popup__title_image");
    imgPopup.src = item.src;
    imgPopup.alt = item.alt;
    imgTitle.textContent = item.parentElement.querySelector(".elements__title").textContent;

}

// сохраняем изменения в popupAvatar
formAvatar.addEventListener("submit", (evt) => {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    clousePopup();
});

//закрываем popup
const clousePopup = () => {
    const
        popup = Array.from(document.querySelectorAll('.popup')),
        popupButton = Array.from(document.querySelectorAll('.popup__close'));

    popup.forEach((item) => {
        document.addEventListener('keyup', (evt) => {
            if (evt.key == 'Escape')
                item.classList.remove("popup_opened");
        });
        item.addEventListener('click', (evt) => {
            if (!evt.target.closest('.popup__window') || evt.target.closest('.popup__button'))
                item.classList.remove("popup_opened");
        });
    })

    popupButton.forEach((item) => {
        item.addEventListener('click', () => {
            item.parentElement.closest('.popup').classList.remove("popup_opened");
        })
    })
};

function createCard(cardName, cardLink) {
    const NewCard = card.cloneNode(true);
    NewCard.querySelector(".elements__title").innerText = cardName;
    NewCard.querySelector(".elements__img").src = cardLink;
    return NewCard;
}

// добавление карточек на страницу из массива
initialCards.forEach((item) => {
    elements.append(createCard(item.name, item.link));
});

// Сохраняем изменения в popupMesto
formMesto.addEventListener("submit", (evt) => {
    evt.preventDefault();
    elements.prepend(createCard(mestoName.value, mestoLink.value));
    clousePopup();
});

// // слушаем кнопки на карточках
elements.addEventListener("click", e => {
    const button = e.target;
    if (button.classList.contains("elements__icon_remove"))
        button.parentElement.remove();
    else if (button.classList.contains("elements__icon_like")) {
        button.classList.toggle("elements__icon_like-active");
    }
    else if (button.classList.contains("elements__img"))
        openPopupImage(button);
})



const showInputError = (formElement, inputElement, errorMessage) => {
    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input_error-active');
};

const hideInputError = (formElement, inputElement) => {
    // Находим элемент ошибки
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__input_error-active');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        // Если проходит, скроем
        hideInputError(formElement, inputElement);
    }
};



const setEventListeners = (formElement) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll('.popup__input')),
        buttonElement = formElement.querySelector('.popup__button');

    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.popup__container'));

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            // У каждой формы отменим стандартное поведение
            evt.preventDefault();
        });

        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement);
    });
};

// Вызовем функцию
enableValidation();
clousePopup();
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся фунцкция
        // hasInvalidInput вернёт true

        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add('popup__button_inactive');
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove('popup__button_inactive');
        buttonElement.removeAttribute('disabled', 'disabled');
    }
};
