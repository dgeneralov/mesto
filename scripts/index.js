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
    card = elements.querySelector(".card").content.children[0],
    cardName = card.querySelector(".elements__title"),
    config = {
        form: '.popup__container',
        submitButton: '.popup__button',
        innactiveButton: 'popup__button_inactive',
        input: '.popup__input',
        inputError: 'popup__input_error',
        spanError: 'popup__input_error-active'
    },
    initialCards = [{
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
function openPopup(popup) {
    document.addEventListener('keyup', hadleKeyup);
    popup.addEventListener('click', clickBt);
    popup.classList.add("popup_opened");
}

// закрытиe popup
function closePopup(popup) {
    popup.removeEventListener('keyup', hadleKeyup);
    popup.removeEventListener('click', clickBt);
    popup.classList.remove("popup_opened");
}

// открываем popupMesto
buttonAdd.addEventListener("click", () => {
    openPopup(popupMesto);
});

// Сохраняем изменения в popupMesto
formMesto.addEventListener("submit", (evt) => {
    const button = popupMesto.querySelector('.popup__button'),
        form = popupMesto.querySelector('.popup__container_mesto'),
        inputList = Array.from(form.querySelectorAll('.popup__input'));
    evt.preventDefault();
    //elements.prepend(createCard(mestoName.value, mestoLink.value));
    form.reset();
    //toggleButtonState(inputList, button, config);
    closePopup(popupMesto);
});

// открываем popupAvatar
buttonEdit.addEventListener("click", () => {
    openPopup(popupAvatar);
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
});

// сохраняем изменения в popupAvatar
formAvatar.addEventListener("submit", (evt) => {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closePopup(popupAvatar);
});

//открываем popupImage
export const openPopupImage = (item) => {
    openPopup(popupImage);
    const imgPopup = popupImage.querySelector(".popup__content"),
        imgTitle = popupImage.querySelector(".popup__title_image");
    imgPopup.src = item;
    imgPopup.alt = item.alt;
    imgTitle.textContent = cardName.textContent;
}

// создаем карточку
// function createCard(cardName, cardLink) {
//     const newCard = card.cloneNode(true),
//         imageCards = newCard.querySelector(".elements__img");

//     imageCards.src = cardLink;
//     imageCards.setAttribute('alt', 'cardName');
//     newCard.querySelector(".elements__title").textContent = cardName;
//     imageCards.addEventListener('click', function() {
//         openPopupImage(cardLink);
//     });
//     newCard.querySelector(".elements__icon_like").addEventListener('click', function() {
//         this.classList.toggle("elements__icon_like-active");
//     });
//     newCard.querySelector(".elements__icon_remove").addEventListener('click', function() {
//         this.parentElement.remove();
//     });

//     return newCard;
// }

//закрытие на esc
const hadleKeyup = (evt) => {
    const popup = document.querySelector('.popup_opened');

    if (evt.key == 'Escape') {
        closePopup(popup);
    }
};

//  закрытие по кнопке и оверлею
const clickBt = (evt) => {
    const popup = document.querySelector('.popup_opened');
    if (!evt.target.closest('.popup__window') || evt.target.classList.contains('popup__close')) {
        closePopup(popup);
    }
};

//добавление карточек на страницу из массива
initialCards.forEach((item) => {
    const NewCard = new Card(card, item);
    const cardElement = NewCard.render();
    elements.append(cardElement);
});


(function() {
    const valid = new FormValidator(config);
    valid.render();
    // console.log(FormValidator.render())
})()
// enableValidation(config);

export default { openPopupImage }
import Card from './card.js';
import FormValidator from './FormValidator.js';