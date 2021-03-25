let popup = document.querySelector(".popup"),
    main = document.querySelector(".main"),
    header = document.querySelector(".header"),
    title = document.querySelector(".profile__title"),
    buttonEdit = document.querySelector(".profile__buttons-edit"),
    popupClouse = document.querySelector(".popup__clouse"),
    subtitle = document.querySelector(".profile__subtitle"),
    like = document.querySelectorAll(".elements__icon"),
    formElement = document.querySelector(".popup__container"),
    nameInput = formElement.querySelector("#name"),
    jobInput = formElement.querySelector("#jobe");

nameInput.value = "Жак-Ив Кусто";
jobInput.value = "Исследователь океана";

function openPopup() {
    popup.classList.add("popup_opened");
    main.style.opacity = 0.5;
    header.style.opacity = 0.5;
}

function clousePopup() {
    popup.classList.remove("popup_opened");
    main.style.opacity = 1;
    header.style.opacity = 1;
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    title.textContent = nameInput.value;
    subtitle.textContent = jobInput.value;
    main.style.opacity = 1;
    header.style.opacity = 1;
    clousePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
buttonEdit.addEventListener("click", openPopup);
popupClouse.addEventListener("click", clousePopup);



