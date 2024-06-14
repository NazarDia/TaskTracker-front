import { Field, ErrorMessage } from 'formik';
import s from './FormInput.module.css';
import icons from '../../images/sprite/sprite-icon.svg';

export default function FormInput({
  id,
  type,
  name,
  placeholder = '',
  children,
  showPassword,
  togglePasswordVisibility,
}) {
  return (
    <div className={s.form}>
      <label htmlFor={id}>{children}</label>
      <div className={s.passwordWrapper}>
        <Field
          type={type}
          name={name}
          id={id}
          placeholder={placeholder}
          className={s.fieldInput}
        ></Field>
        {name === 'password' && (
          <svg onClick={togglePasswordVisibility} className={s.passwordIcon}>
            <use href={`${icons}#${showPassword ? 'icon-eye-off' : 'eye'}`} />
          </svg>
        )}
      </div>
      <span className={s.error}>
        <ErrorMessage name={name} as="span" />
      </span>
    </div>
  );
}
