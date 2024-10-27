const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, deleteFunction, openCardPopupFunction) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title")
    const deleteButton = cardElement.querySelector(".card__delete-button")

    cardTitle.textContent = cardData.name;
    deleteButton.addEventListener("click", deleteFunction);
    cardImage.src = cardData.link;
    cardImage.addEventListener("click", openCardPopupFunction);

    return cardElement;
}

export function deleteCard(event) {
    event.target.closest(".places__item").remove();
}
