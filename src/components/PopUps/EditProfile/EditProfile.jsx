import s from './EditProfile.module.css';
import { useState } from 'react';
import { useUserData } from '../../../hooks/useUserData';
import sprite from '../../../images/sprite/sprite-icon.svg';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../redux/auth/operations';

const EditProfile = ({ onClose }) => {
  const user = useUserData();
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(user.avatarURL);
  const [avatarUploaded, setAvatarUploaded] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChangeAvatar = event => {
    setAvatar(event.target.files[0]);

    setAvatarUploaded(event.target.files[0]);
    const formData = new FormData();

    formData.append('avatarUploaded', avatarUploaded);
  };

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      default:
        return;
    }
  };

  // console.log(avatar);

  if (user.avatarURL === '') {
    console.log(`Аватара у пользователя нет, пришло ''`);
  }

  if (user.avatarURL !== '') {
    console.log(
      `Аватар пришёл, avatarURL:${user.avatarURL}, должна быть фотка`
    );
    console.log(
      `Или фотка загружена только что пользователем, avatarURL:${avatarUploaded}`
    );
  }

  console.log(avatarUploaded.type);

  if (avatarUploaded.type) {
    console.log(`Работает`);
  }

  const modalClose = event => {
    onClose();
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    let updatedProfile;

    if (user.avatarURL !== '' || user.avatarURL === '') {
      if (avatarUploaded.type) {
        if (password === '') {
          updatedProfile = {
            name,
            email,
            avatar,
          };
        } else {
          updatedProfile = {
            name,
            email,
            password,
            avatar,
          };
        }
      } else {
        if (password === '') {
          updatedProfile = {
            name,
            email,
          };
        } else {
          updatedProfile = {
            name,
            email,
            password,
          };
        }
      }
    }

    // console.log(updatedProfile);
    dispatch(updateProfile(updatedProfile));
    //закрити модалку
    modalClose();
  };

  return (
    <div className={s.modal}>
      <h2 className={s.titleName}>Edit profile</h2>

      <form className={s.formStyle} onSubmit={handleFormSubmit}>
        <label className={s.labelStyle}>
          <input
            className={s.inputNameImg}
            type="file"
            onChange={handleChangeAvatar}
          />

          {user.avatarURL === '' ? (
            <svg width="68" height="68" className={s.img}>
              <use xlinkHref={`${sprite}#icon-user-ico`} />
            </svg>
          ) : (
            <img src={user.avatarURL} className={s.imgUser} alt="avatar" />
          )}
        </label>
        <label className={s.labelStyle}>
          <input
            className={s.inputName}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </label>
        <label className={s.labelStyle}>
          <input
            className={s.inputName}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </label>
        <label className={s.labelStyle}>
          <input
            className={s.inputName}
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
          <span className={s.passwordToggle} onClick={togglePasswordVisibility}>
            <svg width="18" height="18" className={s.fieldIcon}>
              <use xlinkHref={`${sprite}#eye`} />
            </svg>
          </span>
        </label>
        <button type="submit" className={s.btnAdd}>
          Send
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
