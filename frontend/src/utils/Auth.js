//export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";
export const BASE_URL = "//localhost:3000";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(
          `Error:${res.status} - uno de los campos se rellenó de forma incorrecta `
        );
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(
          res.status === "400"
            ? `Error ${res.status} : no se ha proporcionado uno o más campos`
            : `Error ${res.status} : no se ha encontrado al usuario con el correo electrónico especificado`
        );
  });
};

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    return res.ok
      ? res.json()
      : Promise.reject(
          res.status === "400"
            ? `Error ${res.status} : Token no proporcionado o proporcionado en el formato incorrecto`
            : `Error ${res.status} : El token provisto es inválido`
        );
  });
};
