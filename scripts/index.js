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
    cardName = card.querySelector(".elements__title");

// добавление карточек на страницу из массива
initialCards.forEach((item) => {
    elements.append(createCard(item.name, item.link));
});



// события закрытия popup
function listenerPopup() {
    const popup = Array.from(document.querySelectorAll('.popup'));

    popup.forEach(function (item) {
        const popupButton = item.querySelector('.popup__close'),
            saveButton = item.querySelector('.popup__button');
        console.log(saveButton)
        const hadleKeyup = (evt) => {
            if (evt.key == 'Escape') {
                item.classList.remove("popup_opened");
            }
            return item
        };
        const clickBt = () => {
            item.classList.remove("popup_opened");
        };

        item.addEventListener('click', click = (evt) => {
            if (!evt.target.closest('.popup__window'))
                item.classList.remove("popup_opened");
        });

        popupButton.addEventListener('click', clickBt);
        //saveButton.addEventListener('click', clickBt);
        document.addEventListener('keyup', hadleKeyup);

    })
}

listenerPopup();

// открываем popup
function openPoup(item) {
    item.classList.add("popup_opened");
}

// закрываем popup
function closePopup(listenerPopup) {
    // const popupButton = item.querySelector('.popup__close'),
    //     popupSubmit = item.querySelector('.popup__button');
    // console.log(popupSubmit)
    item.classList.remove("popup_opened");
    document.removeEventListener('keyup', hadleKeyup.item);
    popupButton.addEventListener('click', clickBt);
};
closePopup();

// открываем popupMesto
buttonAdd.addEventListener("click", () => {
    const button = popupMesto.querySelector('.popup__button'),
        form = popupMesto.querySelector('.popup__container_mesto'),
        inputList = Array.from(form.querySelectorAll('.popup__input'));
    openPoup(popupMesto)
    form.reset();

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
});

function createCard(cardName, cardLink) {
    const newCard = card.cloneNode(true);
    newCard.querySelector(".elements__title").innerText = cardName;
    newCard.querySelector(".elements__img").src = cardLink;
    newCard.querySelector(".elements__img").setAttribute('alt', 'cardName');
    return newCard;
}


// Сохраняем изменения в popupMesto
formMesto.addEventListener("submit", (evt) => {
    evt.preventDefault();
    elements.prepend(createCard(mestoName.value, mestoLink.value));
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

