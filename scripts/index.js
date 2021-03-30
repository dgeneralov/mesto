let popup = document.querySelector(".popup"),
    title = document.querySelector(".profile__title"),
    buttonEdit = document.querySelector(".profile__buttons-edit"),
    popupClose = document.querySelector(".popup__close"),
    subtitle = document.querySelector(".profile__subtitle"),
    formElement = document.querySelector(".popup__container"),
    nameInput = formElement.querySelector("#name"),
    jobInput = formElement.querySelector("#jobe");

function openPopup() {
    popup.classList.add("popup_opened");
    nameInput.value = title.textContent;
    jobInput.value = subtitle.textContent;
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
buttonEdit.addEventListener("click", openPopup);
popupClose.addEventListener("click", closePopup);



