import { Field, ErrorMessage } from 'formik';
import s from './FormInput.module.css';

export default function FormInput({
  id,
  type,
  name,
  placeholder = '',
  children,
}) {
  return (
    <div>
      <label htmlFor={id}>{children}</label>
      <Field
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={s.fieldInput}
      ></Field>
      <span className={s.error}>
        <ErrorMessage name={name} as="span" />
      </span>
    </div>
  );
}
