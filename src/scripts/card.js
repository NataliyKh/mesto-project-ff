const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, deleteFunction, openCardPopupFunction, cardLikeFunction) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title")
    const deleteButton = cardElement.querySelector(".card__delete-button")
    const likeButton = cardElement.querySelector(".card__like-button")

    cardTitle.textContent = cardData.name;
    deleteButton.addEventListener("click", deleteFunction);
    cardImage.src = cardData.link;
    cardImage.addEventListener("click", openCardPopupFunction);
    likeButton.addEventListener("click", cardLikeFunction)

    return cardElement;
}

export function deleteCard(evt) {
    evt.target.closest(".places__item").remove();
}

export function handleCardLike(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
}
