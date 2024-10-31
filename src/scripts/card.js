import { addLikeRequest, deleteLikeRequest } from "./api";

const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

export function createCardElement(card, deleteFunc, cardImageClickHandler, likeCardFunc, myId) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const deleteButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardLikeCounter = cardElement.querySelector(".card__like-counter");

    cardElement.id = card["_id"];
    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardLikeCounter.textContent = card.likes.length;

    setStateForLikeButton(likeButton, hasMyLike(card, myId));

    cardImage.addEventListener("click", cardImageClickHandler);
    likeButton.addEventListener("click", () => likeCardFunc(card, myId, cardElement));

    if (myId !== card.owner["_id"]) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener("click", () => {
            deleteFunc(card);
        });
    }

    return cardElement;
}

export function likeCard(card, myId, cardElement) {
    const likeButton = cardElement.querySelector(".card__like-button");
    const likesCounter = cardElement.querySelector(".card__like-counter");

    const cardHasMyLike = hasMyLike(card, myId);
    const addOrDeleteRequest = cardHasMyLike ? deleteLikeRequest : addLikeRequest;

    addOrDeleteRequest(card["_id"])
        .then((res) => {
            setStateForLikeButton(likeButton, !cardHasMyLike);
            likesCounter.textContent = res.likes.length;
            card.likes = res.likes;
        })
        .catch((err) => {
            console.log(err);
        });
}

function setStateForLikeButton(likeButton, isActive) {
    if (isActive) {
        likeButton.classList.add("card__like-button_is-active");
    } else {
        likeButton.classList.remove("card__like-button_is-active");
    }
}

function hasMyLike(card, myId) {
    return card.likes.some((item) => item["_id"] === myId);
}
