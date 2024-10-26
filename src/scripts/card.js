import { openModal, closeModal } from "./modal";

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
            openPopup(evt.target.src);
        });

    return cardElement;
}

export function deleteCard(event) {
    event.target.closest(".places__item").remove();
}

function openPopup(imageLink) {
    let popup = document.querySelector(".popup_type_image");
    openModal(popup)
    let popupImage = popup.querySelector(".popup__image");
    popupImage.src = imageLink;
}

function openPopupBySelector(popupSelector) {
    let popup = document.querySelector(popupSelector);
    openModal(popup)
}

document
    .querySelector(".profile__add-button")
    .addEventListener("click", function (evt) {
        openPopupBySelector(".popup_type_new-card");
    });

document
    .querySelector(".profile__edit-button")
    .addEventListener("click", function (evt) {
        openPopupBySelector(".popup_type_edit");
    });
