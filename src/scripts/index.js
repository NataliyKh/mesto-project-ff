import '../pages/index.css';
import { handleOpenModal, handleCloseModal } from './modal.js';
import { createCard, deleteCard } from './card.js';
import { initialCards } from './cards.js'


const placesList = document.querySelector('.places__list');

initialCards.forEach(function (initialCard) {
    const newCard = createCard(initialCard, deleteCard); 
    
    placesList.append(newCard);
});
