let popup = document.querySelector(".popup"),
    title = document.querySelector(".profile__title"),
    buttonEdit = document.querySelector(".profile__buttons-edit"),
    popupClouse = document.querySelector(".popup__clouse"),
    buttonSave = popup.querySelector(".popup__button"),
    subtitle = document.querySelector(".profile__subtitle"),
    like = document.querySelectorAll(".elements__icon");
for (i = 0; i < like.length; i++) {
    like[i].onclick = function () {
        if (this.getAttribute("src") == "./images/elenents-icon-active.svg") {
            this.setAttribute("src", "./images/elements-like.svg");
        } else this.setAttribute("src", "./images/elenents-icon-active.svg");
        this.style.opacity = "1";
    };
    like[i].onmouseover = function () {
        if (this.getAttribute("src") == "./images/elements-like.svg") {
            this.style.opacity = "0.6";
        } else this.style.opacity = "1";
    };
    like[i].onmouseout = function () {
        if (this.getAttribute("src") == "./images/elements-like.svg") {
            this.style.opacity = "1";
        } else this.style.opacity = "1";
    };
}

buttonEdit.addEventListener("click", function () {
    popup.classList.add("popup_opened");
});

popupClouse.addEventListener("click", function () {
    popup.classList.remove("popup_opened");
});

let formElement = document.querySelector(".popup__container");
let nameInput = formElement.querySelector("#name");
let jobInput = formElement.querySelector("#jobe");

function formSubmitHandler(evt) {
    evt.preventDefault();

    document.querySelector(".profile__title").textContent = nameInput.value;
    document.querySelector(".profile__subtitle").textContent = jobInput.value;

    popup.classList.remove("popup_opened");
}

formElement.addEventListener("submit", formSubmitHandler);




