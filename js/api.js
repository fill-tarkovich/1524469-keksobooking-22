const urlData = {
  get: 'https://22.javascript.pages.academy/keksobooking/data',
  send: 'https://22.javascript.pages.academy/keksobooking',
};

const getData = (onSuccess, onFail) => {
  fetch(urlData.get)
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    urlData.send,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};


export { getData, sendData }
