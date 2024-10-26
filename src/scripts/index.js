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
export const profileEditButton = document.querySelector(
    ".profile__edit-button"
);

profileAddButton.addEventListener("click", function (evt) {
    openModal(popupNewCard);
});

profileEditButton.addEventListener("click", function (evt) {
    openModal(popupEdit);
});

initialCards.forEach(function (initialCard) {
    const newCard = createCard(initialCard, deleteCard);

    placesList.append(newCard);
});
