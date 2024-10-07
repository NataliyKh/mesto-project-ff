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

// @todo: Вывести карточки на страницу
initialCards.forEach(function (initialCard) {
    let newCard = createCard(initialCard, function () {
        alert('hello')
    }); 
    
    placesList.append(newCard);
});