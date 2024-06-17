import s from './EditProfile.module.css';
import { useState } from 'react';
import { useUserData } from '../../../hooks/useUserData';
import { useTheme } from '../../../hooks/useTheme';
import sprite from '../../../images/sprite/sprite-icon.svg';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../../redux/auth/operations';
import { useFormik } from 'formik';
import { editProfileSchema } from '../../../Schemas/schema';

const defaultAvatars = {
  Light:
    'https://res.cloudinary.com/dshslvnpv/image/upload/v1718476246/avatar/jhzzokkqmyggxvkhr0rk.png',
  Violet:
    'https://res.cloudinary.com/dshslvnpv/image/upload/v1718476246/avatar/evq1fop5y2g61v4qmrdb.png',
  Dark: 'https://res.cloudinary.com/dshslvnpv/image/upload/v1718476246/avatar/uktinzlwlux9jedzsz6s.png',
};

const EditProfile = ({ onClose }) => {
  const user = useUserData();
  const theme = useTheme(); // Отримання поточної теми
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: '',
    },
    validationSchema: editProfileSchema,
    onSubmit: values => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      if (values.password) formData.append('password', values.password);
      if (avatar) formData.append('avatar', avatar);

      dispatch(updateProfile(formData));
      onClose();
    },
  });

  const handleChangeAvatar = event => {
    setAvatar(event.target.files[0]);
  };

  const avatarURL =
    user.avatarURL || defaultAvatars[theme] || defaultAvatars['Light'];
  return (
    <div className={s.modal}>
      <h2 className={s.titleName}>Edit profile</h2>
      <form className={s.formStyle} onSubmit={formik.handleSubmit}>
        <label className={s.labelStyle}>
          <input
            className={s.inputNameImg}
            type="file"
            onChange={handleChangeAvatar}
          />
          {avatar ? (
            <img
              src={URL.createObjectURL(avatar)}
              className={s.imgUser}
              alt="avatar"
            />
          ) : (
            <img src={avatarURL} className={s.imgUser} alt="avatar" />
          )}
          <svg
            className={s.btnplus}
            width={24}
            height={24}
            stroke="var(--sidebar-btn-icon)"
          >
            <use href={`${sprite}#icon-plus`}></use>
          </svg>
        </label>
        <label className={s.labelStyle}>
          <input
            className={s.inputName}
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={s.error}>{formik.errors.name}</div>
          ) : null}
        </label>
        <label className={s.labelStyle}>
          <input
            className={s.inputName}
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={s.error}>{formik.errors.email}</div>
          ) : null}
        </label>
        <label className={s.labelStyle}>
          <input
            className={s.inputName}
            type={passwordVisible ? 'text' : 'password'}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
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
          {formik.touched.password && formik.errors.password ? (
            <div className={s.error}>{formik.errors.password}</div>
          ) : null}
        </label>
        <button type="submit" className={s.btnAdd}>
          Send
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
