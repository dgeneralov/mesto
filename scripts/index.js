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
    config = {
        form: '.popup__container',
        submitButton: '.popup__button',
        innactiveButton: 'popup__button_inactive',
        input: '.popup__input',
        inputError: 'popup__input_error',
        spanError: 'popup__input_error-active'
    };

// открываем popup
function openPoup(popup) {

    const hadleKeyup = (evt) => {
        if (evt.key == 'Escape') {
            popup.classList.remove("popup_opened");
        }
        return popup
    };

    popup.classList.add("popup_opened");
    document.addEventListener('keyup', hadleKeyup);
}

// закрытиe popup
function clousePopup(popup) {

    popup.addEventListener('click', (evt) => {
        if (!evt.target.closest('.popup__window'))
            popup.classList.remove("popup_opened");
    });

    const popupButton = popup.querySelector('.popup__close'),
        saveButton = popup.querySelector('.popup__button'),
        clickBt = () => {
            popup.classList.remove("popup_opened");
        };

    popupButton.addEventListener('click', clickBt);
    document.removeEventListener('keyup', openPoup.hadleKeyup);

    if (popup != popupImage) {
        saveButton.addEventListener('click', clickBt);
    } else
        return;

}

// открываем popupMesto
buttonAdd.addEventListener("click", () => {
    openPoup(popupMesto);
    clousePopup(popupMesto);
});

// Сохраняем изменения в popupMesto
formMesto.addEventListener("submit", (evt) => {
    const button = popupMesto.querySelector('.popup__button'),
        form = popupMesto.querySelector('.popup__container_mesto'),
        inputList = Array.from(form.querySelectorAll('.popup__input'));
    evt.preventDefault();
    elements.prepend(createCard(mestoName.value, mestoLink.value));
    form.reset();
    toggleButtonState(inputList, button, config);
    clousePopup(popupMesto);
});

// открываем popupAvatar
buttonEdit.addEventListener("click", () => {
    openPoup(popupAvatar);
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
    clousePopup(popupAvatar);
});

//открываем popupImage
const openPopupImage = (item) => {
    openPoup(popupImage);
    const imgPopup = popupImage.querySelector(".popup__content"),
        imgTitle = popupImage.querySelector(".popup__title_image");
    imgPopup.src = item.src;
    imgPopup.alt = item.alt;
    imgTitle.textContent = item.parentElement.querySelector(".elements__title").textContent;
    clousePopup(popupImage);
}

// сохраняем изменения в popupAvatar
formAvatar.addEventListener("submit", (evt) => {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
});

// создаем карточку
function createCard(cardName, cardLink) {
    const newCard = card.cloneNode(true),
        imageCards = newCard.querySelector(".elements__img");

    imageCards.src = cardLink;
    imageCards.setAttribute('alt', 'cardName');
    newCard.querySelector(".elements__title").textContent = cardName;
    imageCards.addEventListener('click', function() {
        openPopupImage(this);
    });
    newCard.querySelector(".elements__icon_like").addEventListener('click', function() {
        this.classList.toggle("elements__icon_like-active");
    });
    newCard.querySelector(".elements__icon_remove").addEventListener('click', function() {
        this.parentElement.remove();
    });

    return newCard;
}

// добавление карточек на страницу из массива
initialCards.forEach((item) => {
    elements.append(createCard(item.name, item.link));
});

enableValidation(config);