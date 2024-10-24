import '../pages/index.css';

import { initialCards } from './cards.js'

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteFunction) {
    const cardElement = cardTemplate.cloneNode(true);
    
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunction);

    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.closest('.places__item').remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (initialCard) {
    const newCard = createCard(initialCard, deleteCard); 
    
    placesList.append(newCard);
});