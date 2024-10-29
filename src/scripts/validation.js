export function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        setEventListenersForAllFormInputs(formElement, validationConfig);
    });
}

function setEventListenersForAllFormInputs(formElement, validationConfig) {
    const inputList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector
    );

    toogleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            doInputValidationAndShowHideErrorMessage(formElement, inputElement, validationConfig);
            toogleButtonState(inputList, buttonElement, validationConfig);
        });
    });
}

function doInputValidationAndShowHideErrorMessage(formElement, inputElement, validationConfig) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            validationConfig
        );
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
}

function toogleButtonState(inputList, buttonElement, validationConfig) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
}

export function clearValidation(formElement, validationConfig) {

    const buttonElement = formElement.querySelector(
        validationConfig.submitButtonSelector
    );
    const inputList = Array.from(
        formElement.querySelectorAll(validationConfig.inputSelector)
    );

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);
    });

    toogleButtonState(inputList, buttonElement, validationConfig);
}

function hasInvalidInput(inputList) {
    return inputList.some((item) => {
        return !item.validity.valid;
    });
}

function showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
}