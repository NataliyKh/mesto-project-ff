import { openModal, closeModal } from "./modal.js";
import * as consts from "./index.js";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, deleteFunction) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector(".card__image").src = cardData.link;
    cardElement.querySelector(".card__title").textContent = cardData.name;

    cardElement
        .querySelector(".card__delete-button")
        .addEventListener("click", deleteFunction);

    cardElement
        .querySelector(".card__image")
        .addEventListener("click", function (evt) {
            openModal(consts.popupImage);
            consts.imageInPopup.src = evt.target.src;
        });

    return cardElement;
}

export function deleteCard(event) {
    event.target.closest(".places__item").remove();
}
