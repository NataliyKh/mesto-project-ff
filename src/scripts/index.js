import "../pages/index.css";
import { handleOpenModal, handleCloseModal } from "./modal.js";
import { createCard, deleteCard } from "./card.js";
import { initialCards } from "./cards.js";
import { openModal, closeModal } from "./modal.js";

const placesList = document.querySelector(".places__list");

const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupImage = document.querySelector(".popup_type_image");
const imageInPopup = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

const profileTitle = document.querySelector(".profile__title")
const profileDescription = document.querySelector(".profile__description")

const editProfileForm = document.querySelector(".popup__form[name='edit-profile']")
const nameInput = editProfileForm.querySelector(".popup__input_type_name") 
const jobInput = editProfileForm.querySelector(".popup__input_type_description") 

const addCardForm = document.querySelector(".popup__form[name='new-place']")
const cardNameInput = addCardForm.querySelector(".popup__input_type_card-name") 
const cardUrlInput = addCardForm.querySelector(".popup__input_type_url") 

const profileAddButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");

profileAddButton.addEventListener("click", () => openModal(popupNewCard));
profileEditButton.addEventListener("click", () => openModal(popupEdit));

document.querySelectorAll(".popup__close").forEach((popupCloseButton) => {
    popupCloseButton.addEventListener("click", handleClosePopup);
});

document.querySelectorAll(".popup").forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target == popup) {
            closeModal(popup)
        }
    })
    popup.classList.add('popup_is-animated')
})

function handleClosePopup(evt) {
    let openedPopup = document.querySelector(".popup_is-opened");
    closeModal(openedPopup);
}

function handleCardImageClick(evt) {
    imageInPopup.src = evt.target.src;
    popupImageCaption.textContent = evt.target.parentNode.querySelector('.card__title').textContent

    openModal(popupImage);
}

function handleCardLike(evt) {
    evt.target.classList.toggle("card__like-button_is-active")
}

initialCards.forEach(function (initialCard) {
    const newCard = createCard(initialCard, deleteCard, handleCardImageClick, handleCardLike);
    placesList.append(newCard);
});

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value
    profileDescription.textContent = jobInput.value

    editProfileForm.reset()
    closeModal(popupEdit)
}

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit); 

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const cardData = {
        name: cardNameInput.value,
        link: cardUrlInput.value
    }

    const newCard = createCard(cardData, deleteCard, handleCardImageClick, handleCardLike)

    placesList.prepend(newCard)

    addCardForm.reset()
    closeModal(popupNewCard)
}

addCardForm.addEventListener('submit', handleAddCardFormSubmit);