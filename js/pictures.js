const FILE_TYPES = ['svg', 'jpg', 'jpeg', 'png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarUpload = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__picture');
const photoUpload = document.querySelector('.ad-form__input');
const photoPreview = document.querySelector('.ad-form__photo');

const uploadAvatar = () => {
  avatarUpload.addEventListener('change', () => {
    const file = avatarUpload.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
};

const uploadPhoto = () => {
  photoUpload.addEventListener('change', () => {
    const file = photoUpload.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const photo = document.createElement('img');
        photo.src = reader.result;
        photo.width = 70;
        photo.height = 70;
        photo.alt = 'Фотография жилья';
        photoPreview.appendChild(photo);
      });
      reader.readAsDataURL(file);
    }
  });
};

const clearPictures = () => {
  avatarPreview.src = DEFAULT_AVATAR;
  photoPreview.innerHTML = '';
}

export { uploadAvatar, clearPictures, uploadPhoto }
