let
    popup = document.querySelector(".popup"),
    buttonEdit = document.querySelector(".buttons__edit"),
    popupClouse = document.querySelector(".popup__clouse")
    ;

buttonEdit.addEventListener("click", function () {
    popup.classList.add("popup_opened")
})

popupClouse.addEventListener("click", function () {
    popup.classList.remove("click", "popup_opened")
})

