export function openModal(domElement) {
    domElement.classList.add("popup_is-opened");
}

export function closeModal(domElement) {
    domElement.classList.remove("popup_is-opened");
}


















export function handleOpenModal(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handleCloseModalByEsc);
}

export function handleCloseModal(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleCloseModalByEsc);
}

function handleCloseModalByEsc(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        handleCloseModal(openedPopup);
    }
}


