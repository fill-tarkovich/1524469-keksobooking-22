const DATA_ERROR_DURATION = 3000;
const POPUP_Z_INDEX = 1000;

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const createLoadErrorPopup = (popupText) => {
  const dataErrorPopup = successTemplate.cloneNode(true);
  dataErrorPopup.style.zIndex = POPUP_Z_INDEX;
  const dataErrorText = dataErrorPopup.querySelector('.success__message');
  dataErrorText.textContent = popupText;
  main.appendChild(dataErrorPopup);

  setTimeout(() => {
    dataErrorPopup.remove();
  }, DATA_ERROR_DURATION);
}

const pressEscape = (popup) => {
  return (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      popup.remove();
      document.removeEventListener('keydown', pressEscape(popup));
    }
  };
}

const createPopup = (template, error) => {
  const popup = template.cloneNode(true);
  popup.style.zIndex = POPUP_Z_INDEX;
  main.appendChild(popup);
  if (error) {
    const buttonError = popup.querySelector('.error__button');
    buttonError.addEventListener('click', () => {
      popup.remove();
    });
  }
  document.addEventListener('keydown', pressEscape(popup));
  popup.addEventListener('click', () => {
    popup.remove();
  });
};

const showSuccessPopup = () => {
  createPopup(successTemplate, false);
};

const showFailPopup = () => {
  createPopup(errorTemplate, true);
}

export { createLoadErrorPopup, showSuccessPopup, showFailPopup }
