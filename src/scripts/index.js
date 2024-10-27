import "../pages/index.css";
import { handleOpenModal, handleCloseModal } from "./modal.js";
import { createCard, deleteCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";

const placesList = document.querySelector(".places__list");

export const popupEdit = document.querySelector(".popup_type_edit");
export const popupNewCard = document.querySelector(".popup_type_new-card");
export const popupImage = document.querySelector(".popup_type_image");
export const imageInPopup = popupImage.querySelector(".popup__image");

export const profileAddButton = document.querySelector(".profile__add-button");
export const profileEditButton = document.querySelector(".profile__edit-button");

profileAddButton.addEventListener("click", () => openModal(popupNewCard));
profileEditButton.addEventListener("click", () => openModal(popupEdit));

// add hadnlers for closing popups
document.querySelectorAll(".popup__close").forEach((popupCloseButton) => {
    popupCloseButton.addEventListener("click", handleClosePopup);
});

document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target == popup) {
            closeModal(popup)
        }
    })
})

export function handleClosePopup(evt) {
    let openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
}

export function handleCardImageClick(evt) {
    openModal(popupImage);
    imageInPopup.src = evt.target.src;
}

initialCards.forEach(function (initialCard) {
    const newCard = createCard(initialCard, deleteCard, handleCardImageClick);
    placesList.append(newCard);
});
