import { getToken } from "./token.js";

class Api {
  constructor(options) {
    this.options = options;
  }

  _getHeaders() {
    return {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    };
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  //--- Auth ---
  register = (email, password) => {
    return fetch(this.options.baseUrl + "/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  };

  login = (email, password) => {
    return fetch(this.options.baseUrl + "/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkResponse);
  };

  //--- Users ---
  getUser() {
    return fetch(this.options.baseUrl + "/users/me", {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(this.options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  }

  setAvatar(avatar) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  //--- Cards ---
  getCardsList() {
    return fetch(this.options.baseUrl + "/cards", {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  addCard({ name, link }) {
    return fetch(this.options.baseUrl + "/cards", {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  likeCard(id, isLiked) {
    return fetch(`${this.options.baseUrl}/cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://localhost:5000",
});

export default api;
