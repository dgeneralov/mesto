# **mesto**
### **Описание проекта**

- #### _Проект создан в учебных целях. в рамках проектной деятельности на платформе_ [Яндекс Практикум](https://praktikum.yandex.ru)

- #### _В проектной работе были реализованы:_

- Организация файлов по БЭМ
- Адаптивная верстка для устройств с шириной экрана 320 и 1280 ppi, с приминением медиа-запросов
- Публикация на хостинге [GitHub](https://dgeneralov.github.io/mesto/)

```css

@media screen and (max-width: 1279px) {
  .root {
     min-width: 1024px;
  }
} 

@media screen and (max-width: 767px) {
  .root {
     min-width: 320px;
  }
} 
```
- Применеие Grid Layout
- Применеие событий onclick,onmouseover,onmouseout. Реализованно на js.
- интерактивность кнопок "like". 
```js
for (i = 0; i < like.length; i++) {
    like[i].onclick = function () {

        if (this.getAttribute("src") == "./images/elenents-icon-active.svg") {
            this.setAttribute("src", "./images/elements-like.svg");

        } else
            this.setAttribute("src", "./images/elenents-icon-active.svg");
        this.style.opacity = "1";
    }
    like[i].onmouseover = function () {
        if (this.getAttribute("src") == "./images/elements-like.svg") {
            this.style.opacity = "0.6";
        } else
            this.style.opacity = "1";
    }
    like[i].onmouseout = function () {
        if (this.getAttribute("src") == "./images/elements-like.svg") {
            this.style.opacity = "1";
        } else
            this.style.opacity = "1";
    }

}
```
- возможность редактировать текст на сайте с помощью спеуиального окна "popup"
```js
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
```
- Оформление файла [README](https://github.com/dgeneralov/russian-travel/blob/master/README.md "Привет")

### **Инструкция и системные требования:**

- Веб-браузер

  - _google chrome_
  - _mazila firefox_
  - _yandex браузер_
  - _ms edge_

- Дабл клик по [index.html](https://github.com/dgeneralov/russian-travel/blob/master/index.html) и готово.