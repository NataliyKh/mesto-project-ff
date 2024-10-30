const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-24",
    headers: {
        authorization: "71650fad-a160-4584-a73a-b0ef8be1be2d",
        "Content-Type": "application/json",
    },
};

function get(uri) {
    return fetch(
        config.baseUrl + uri,
        {
            headers: config.headers,
        }
    ).then(handleResponse);
}

function post(uri, data, method = "POST") {
    return fetch(config.baseUrl + uri, {
        method,
        headers: config.headers,
        body: JSON.stringify(data),
    }).then(handleResponse);
}

const handleResponse = (response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
};

export function deleteCardRequest(cardId) {
    return post(`/cards/${cardId}`, {}, "DELETE");
}

export function addCardRequest(cardName, cardLink) {
    return post("/cards", {
        name: cardName,
        link: cardLink,
    });
}

export function changeProfileInfoRequest(profileName, profileDesc) {
    return post(
        "/users/me",
        {
            name: profileName,
            about: profileDesc,
        },
        "PATCH"
    );
}

export function changeAvatarRequest(inputLink) {
    return post(
        "/users/me/avatar",
        {
            avatar: inputLink,
        },
        "PATCH"
    );
}

export function getMyInfoRequest() {
    return get("/users/me");
}

export function getCardsRequest() {
    return get("/cards");
}

export function deleteLikeRequest(card) {
    return post(`/cards/likes/${card["_id"]}`, {}, "DELETE");
}

export function addLikeRequest(card) {
    return post(`/cards/likes/${card["_id"]}`, {}, "PUT");
}
