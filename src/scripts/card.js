const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, deleteFunction) {
    const cardElement = cardTemplate.cloneNode(true);
    
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunction);

    cardElement.querySelector('.card__image').addEventListener('click', function () {
        openPopup()
    })

    return cardElement;
}

export function deleteCard(event) {
    event.target.closest('.places__item').remove()
}