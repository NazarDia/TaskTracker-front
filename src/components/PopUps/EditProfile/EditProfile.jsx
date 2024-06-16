import s from './EditProfile.module.css';
import { useState } from 'react';
import { useUserData } from '../../../hooks/useUserData';
import sprite from '../../../images/sprite/sprite-icon.svg';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../redux/auth/operations';

const EditProfile = ({ onClose }) => {
  const user = useUserData();
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChangeAvatar = event => {
    setAvatar(event.target.files[0]);
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    if (password) formData.append('password', password);
    if (avatar) formData.append('avatar', avatar);

    // Логування вмісту formData
    // for (let pair of formData.entries()) {
    //   console.log(`${pair[0]}: ${pair[1]}`);
    // }

    dispatch(updateProfile(formData));
    onClose();
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
          {user.avatarURL ? (
            avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                className={s.imgUser}
                alt="avatar"
              />
            ) : (
              <img src={user.avatarURL} className={s.imgUser} alt="avatar" />
            )
          ) : (
            <svg width="68" height="68" className={s.img}>
              <use xlinkHref={`${sprite}#icon-user-ico`} />
            </svg>
          )}
        </label>
        <label className={s.labelStyle}>
          <input
            className={s.inputName}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </label>
        <label className={s.labelStyle}>
          <input
            className={s.inputName}
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
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
              <use
                xlinkHref={`${sprite}#${
                  passwordVisible ? 'eye' : 'icon-eye-off'
                }`}
              />
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
