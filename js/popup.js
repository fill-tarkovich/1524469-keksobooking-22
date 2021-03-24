const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const DATA_ERROR_DURATION = 3000;
const POPUP_Z_INDEX = 1000;

// Сообщение об ошибке загрузки данных
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

// Закрытие клавишей ESC

const onEscape = (popup) => {
  return (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      popup.remove();
      document.removeEventListener('keydown', onEscape(popup));
    }
  };
}

// Функция создания попапа для формы
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
  document.addEventListener('keydown', onEscape(popup));
  popup.addEventListener('click', () => {
    popup.remove();
  });
};

// Успешная отправка
const showSuccessPopup = () => {
  createPopup(successTemplate, false);
};

// Неуспешная отправка
const showFailPopup = () => {
  createPopup(errorTemplate, true);
}

export { createLoadErrorPopup, showSuccessPopup, showFailPopup }
