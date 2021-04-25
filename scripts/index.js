const popupAvatar = document.querySelector(".popup_avatar"),
    popupMesto = document.querySelector(".popup_mesto"),
    popupImage = document.querySelector(".popup__image"),
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
    nameInput = formAvatar.querySelector("#name"),
    jobInput = formAvatar.querySelector("#jobe"),
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
buttonAdd.addEventListener("click", () => openPoup(popupMesto));

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
    imgTitle.textContent = item.parentElement.querySelector(".elements__title").textContent;

}

// сохраняем изменения в popupAvatar
formAvatar.addEventListener("submit", (evt) => {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closePopup(popupAvatar);
});

//закрываем popup
function closePopup(item) {
    item.classList.remove("popup_opened");
}
// обработчики на закрытие
popupCloseAvatar.addEventListener("click", () => closePopup(popupAvatar));
popupClouseImage.addEventListener("click", () => closePopup(popupImage));
popupCloseMesto.addEventListener("click", () => closePopup(popupMesto));
const newCard = card.cloneNode(true);
const openPopupImageCard = () => {
}

// // слушаем кнопки на карточках
elements.addEventListener("click", e => {
    const button = e.target;
    if (button.classList.contains("elements__icon_remove"))
        button.parentElement.remove();
    else if (button.classList.contains("elements__icon_like")) {
        button.classList.toggle("elements__icon_like-active");
        button.style.opacity = "1";
    }
    else if (button.classList.contains("elements__img"))
        openPopupImage(button);
})

// добавление карточек на страницу из массива
initialCards.forEach((item) => {
    const newCard = card.cloneNode(true);
    newCard.querySelector(".elements__title").innerText = item.name;
    newCard.querySelector(".elements__img").src = item.link;
    elements.append(newCard);
});

// Сохраняем изменения в popupMesto
formMesto.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newCard = card.cloneNode(true);
    newCard.querySelector(".elements__title").innerText = mestoName.value;
    newCard.querySelector(".elements__img").src = mestoLink.value;
    elements.prepend(newCard);
    closePopup(popupMesto);
});