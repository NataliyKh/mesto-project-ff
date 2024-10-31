import "../pages/index.css";
import {
    likeCard,
    createCardElement as createCardElemenentFuncFromCardJs,
    deleteCard,
} from "./card.js";
import { openModal, closeModal, handleCloseModelByOverlayClick } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
    getMyInfoRequest,
    getCardsRequest,
    deleteCardRequest,
    addCardRequest,
    changeProfileInfoRequest,
    changeAvatarRequest,
} from "./api.js";

let accountId = "";
let currentCardIdForDeletion;
let currentCardElemForDeletion;
const cardsList = document.querySelector(".places__list");

// CARD POPUP
const popupBigCard = document.querySelector(".popup_type_image");

const imageInPopup = popupBigCard.querySelector(".popup__image");
const popupImageCaption = popupBigCard.querySelector(".popup__caption");

// PROFILE
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProlife = document.querySelector(".popup_type_edit");

const popupEditProfileForm = document.forms["edit-profile"];
const popupEditProfileNameInput = popupEditProfileForm.elements.name;
const popupEditProfileDescriptionInput = popupEditProfileForm.elements.description;
const popupEditProfileSaveButton = popupEditProlife.querySelector(".popup__button");

// ADD CARD
const addCardButton = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");

const popupAddCardForm = document.forms["new-place"];
const popupAddCardNameInput = popupAddCardForm["place-name"];
const popupAddCardLinkInput = popupAddCardForm.link;
const popupAddCardSaveButton = popupAddCard.querySelector(".popup__button");

// AVATAR
const popupAvatar = document.querySelector(".popup_avatar");
const popupAvatarButton = popupAvatar.querySelector(".popup__button");

const popupAvatarForm = document.forms["change-avatar"];
const popupAvatarLinkInput = popupAvatarForm.elements.link;

// DELETE CARD POPUP
const popupDeleteCard = document.querySelector(".popup_delete-image");
const popupDeleteCardForm = document.forms["delete-card"];

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

// общая логика для всех попапов
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

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
profileEditButton.addEventListener("click", () => {
    popupEditProfileNameInput.value = profileTitle.textContent;
    popupEditProfileDescriptionInput.value = profileDescription.textContent;

    clearValidation(popupEditProfileForm, validationConfig);
    openModal(popupEditProlife);
});

popupEditProfileForm.addEventListener("submit", handleEditProfileFormSubmit);

function handleEditProfileFormSubmit(evt) {
    evt.preventDefault();
    renderSaving(true, popupEditProfileSaveButton);

    changeProfileInfoRequest(popupEditProfileNameInput.value, popupEditProfileDescriptionInput.value)
        .then((res) => {
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;

            closeModal(popupEditProlife);
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderSaving(false, popupEditProfileSaveButton);
        });
}

// ИЗМЕНЕНИЕ АВАТАРА
profileImage.addEventListener("click", () => {
    popupAvatarForm.reset();

    clearValidation(popupAvatarForm, validationConfig);
    openModal(popupAvatar);
});

popupAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    renderSaving(true, popupAvatarButton);

    changeAvatarRequest(popupAvatarLinkInput.value)
        .then((res) => {
            profileImage.style = `background-image: url('${res.avatar}')`;

            closeModal(popupAvatar);
            popupAvatarForm.reset();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderSaving(false, popupAvatarButton);
        });
}

// для попапа карточки
function openCardPopup(name, link) {
    imageInPopup.src = link;
    imageInPopup.alt = name;
    popupImageCaption.textContent = name;

    openModal(popupBigCard);
}

// ВСЁ ПРО ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
addCardButton.addEventListener("click", () => {
    popupAddCardForm.reset();

    clearValidation(popupAddCardForm, validationConfig);
    openModal(popupAddCard);
});

popupAddCardForm.addEventListener("submit", handleAddCardFormSubmit);

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    renderSaving(true, popupAddCardSaveButton);

    addCardRequest(popupAddCardNameInput.value, popupAddCardLinkInput.value)
        .then((card) => {
            const newCardElement = createCardElement(card);
            cardsList.prepend(newCardElement);

            closeModal(popupAddCard);
            popupAddCardForm.reset();
        })
        .catch((err) => console.log(err))
        .finally(() => {
            renderSaving(false, popupAddCardSaveButton);
        });
}

function createCardElement(cardData) {
    return createCardElemenentFuncFromCardJs(
        cardData,
        openDeleteConfirmationPopup,
        openCardPopup,
        likeCard,
        accountId
    );
}

function renderSaving(isLoading, button) {
    if (isLoading) {
        button.textContent = "Сохранение...";
    } else {
        button.textContent = button.dataset.buttonText;
    }
}

// ВСЁ про УДАЛЕНИЕ КАРТОЧКИ
function openDeleteConfirmationPopup(cardId, cardElement) {
    currentCardIdForDeletion = cardId;
    currentCardElemForDeletion = cardElement;

    openModal(popupDeleteCard);
}

popupDeleteCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    deleteCard(currentCardIdForDeletion, currentCardElemForDeletion)
        .then(() => closeModal(popupDeleteCard))
});

// загрузка изначальный карточек и информации профиля
Promise.all([getCardsRequest(), getMyInfoRequest()])
    .then((responses) => {
        const myInfoResponse = responses[1];
        accountId = myInfoResponse["_id"];

        profileTitle.textContent = myInfoResponse.name;
        profileDescription.textContent = myInfoResponse.about;
        profileImage.style = `background-image: url('${myInfoResponse.avatar}')`;

        const getCardsResponse = responses[0];
        getCardsResponse.forEach((card) => {
            const cardElement = createCardElement(card);
            cardsList.append(cardElement);
        });
    })
    .catch((err) => {
        console.log(err);
    });

// включение валидации
enableValidation(validationConfig);
