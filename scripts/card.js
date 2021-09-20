import openPopupImage from './index.js';

export default class Card {
    constructor(template, data) {
        this.template = template;
        this.data = data;
    }

    _getCard() {
        return this.template.cloneNode(true);
    }

    render() {
        this._newCard = this._getCard();
        this._getListener();
        this._newCard.querySelector(".elements__title").textContent = this.data.name;
        this._newCard.querySelector(".elements__img").src = this.data.link;
        this._newCard.querySelector('.elements__img').setAttribute('alt', 'cardName');
        return this._newCard;
    }

    _getListener() {
        this._newCard.querySelector(".elements__icon_like").addEventListener('click', () => {
            this._getLike(this._newCard);
        });
        this._newCard.querySelector(".elements__icon_remove").addEventListener('click', () => {
            this._getRemove();
        });
        this._newCard.querySelector(".elements__img").addEventListener('click', () => {
            openPopupImage(document.querySelector(".popup_card"));
        });
    };

    _getLike(item) {
        item.querySelector(".elements__icon_like").classList.toggle("elements__icon_like-active");
    }

    _getRemove() {
        this._newCard.querySelector('.elements__element').remove();

    }

    // _openImage() {
    //     this.openPopupImage = openPopupImage();
    //     openPopupImage(this._newCard.querySelector('.elements__img').src);
    // }




};