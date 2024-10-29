import "../pages/index.css";
import { handleOpenModal, handleCloseModal } from "./modal.js";
import { createCard, deleteCard, handleCardLike } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal, handleCloseModelByOverlayClick } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";

const placesList = document.querySelector(".places__list");

const popupEditProlife = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupAddNewCard = document.querySelector(".popup_type_image");
const imageInPopup = popupAddNewCard.querySelector(".popup__image");
const popupImageCaption = popupAddNewCard.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const jobInput = editProfileForm.elements.description;

const addCardForm = document.forms["new-place"];
const cardNameInput = addCardForm["place-name"];
const cardUrlInput = addCardForm.link;

const addCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

addCardButton.addEventListener("click", () => {
    addCardForm.reset()
    
    clearValidation(addCardForm, validationConfig)
    openModal(popupNewCard)
});

profileEditButton.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    clearValidation(editProfileForm, validationConfig)
    openModal(popupEditProlife);
});

document.querySelectorAll(".popup__close").forEach((popupCloseButton) => {
    popupCloseButton.addEventListener("click", handleClosePopup);
});

document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener("click", handleCloseModelByOverlayClick);
    popup.classList.add("popup_is-animated");
});

function handleClosePopup(evt) {
    const openedPopup = evt.target.closest(".popup");
    closeModal(openedPopup);
}

function handleCardImageClick(evt) {
    imageInPopup.src = evt.target.src;
    popupImageCaption.textContent =
        evt.target.parentNode.querySelector(".card__title").textContent;

    openModal(popupAddNewCard);
}

initialCards.forEach(function (initialCard) {
    const newCard = createCard(
        initialCard,
        deleteCard,
        handleCardImageClick,
        handleCardLike
    );
    placesList.append(newCard);
});

enableValidation(validationConfig);

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(popupEditProlife);
}

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const cardData = {
        name: cardNameInput.value,
        link: cardUrlInput.value,
    };

    const newCard = createCard(
        cardData,
        deleteCard,
        handleCardImageClick,
        handleCardLike
    );

    placesList.prepend(newCard);

    addCardForm.reset();
    closeModal(popupNewCard);
}

addCardForm.addEventListener("submit", handleAddCardFormSubmit);
