class Api {
  constructor(options) {
    this.options = options;
  }

  getUserInfo() {
    return fetch(this.options.baseUrl + "users/me", {
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  setUserInfo({ name, about }) {
    return fetch(this.options.baseUrl + "users/me", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getCardsList() {
    return fetch(this.options.baseUrl + "cards", {
      headers: {
        authorization: this.options.headers.authorization,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addCard({ name, link }) {
    return fetch(this.options.baseUrl + "cards", {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  likeCard(id, isLiked) {
    return fetch(`${this.options.baseUrl}cards/${id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  setAvatar(avatar) {
    return fetch(`${this.options.baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: "e9c54c1d-7d1b-4a32-808f-b00f8ab88aa4",
    "Content-Type": "application/json",
  },
});

export default api;
