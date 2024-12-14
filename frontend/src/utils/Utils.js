const popup = document.querySelector(".popup_profile");
const profileButton = document.querySelector(".profile__edit-button");
const imageAddButton = document.querySelector(".profile__add-button");
const formImage = document.querySelector(".popup_form-image");

//popup image
const popupImage = document.querySelector(".popup_zoom");

//user info
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__info-aboutme");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#about-me");

//formValidator
const formConfig = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error-active",
};

// popup confirmation
const popupConfirmation = document.querySelector(".popup_delete-image");

// popup avatar
const avatarButton = document.querySelector(".profile__avatar");
const popupAvatar = document.querySelector(".popup_avatar");
const avatarInput = document.querySelector("#avatar");
const profileAvatar = document.querySelector(".profile__image-avatar");

//botones
const updateProfile = document.querySelector("#update_profile");
const createImage = document.querySelector("#create_image");
const updateAvatar = document.querySelector("#update_avatar");

export {
  profileButton,
  imageAddButton,
  popupImage,
  formImage,
  profileName,
  profileJob,
  popup,
  nameInput,
  jobInput,
  formConfig,
  popupConfirmation,
  avatarButton,
  popupAvatar,
  avatarInput,
  profileAvatar,
  updateProfile,
  createImage,
  updateAvatar,
};
