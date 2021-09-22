import { openPopupImage as showImg } from './index.js';

export default class Card {
    constructor(_template, _data) {
        this._template = _template;
        this._data = _data;
    }

    _getCard() {
        return this._template.cloneNode(true);
    }

    render() {
        this._newCard = this._getCard();
        this._getListener();
        this._newCard.querySelector(".elements__title").textContent = this._data.name;
        this._newCard.querySelector(".elements__img").src = this._data.link;
        this._newCard.querySelector('.elements__img').setAttribute('alt', 'cardName');
        return this._newCard;
    }

    _getListener() {
        this._newCard.querySelector(".elements__icon_like").addEventListener('click', () => {
            this._getLike();
        });
        this._newCard.querySelector(".elements__icon_remove").addEventListener('click', () => {
            this._getRemove();
        });
        this._newCard.querySelector(".elements__img").addEventListener('click', () => {
            showImg(this._data.link);
        });
    };

    _getLike() {
        this._newCard.querySelector(".elements__icon_like").classList.toggle("elements__icon_like-active");
    }

    _getRemove() {
        this._newCard.remove();

    }
};