import * as yup from 'yup';

export const registerUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z0-9]+$/, 'Only alphanumeric characters are allowed')
    .min(2, 'Too short!')
    .max(32, 'Too long!')
    .required('Required, please insert your name'),
  email: yup
    .string()
    .trim()
    .email()
    .required('Required, please insert the email'),
  password: yup
    .string()
    .trim()
    .min(8, 'Too short!')
    .max(64, 'Too long!')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!.*\s).{8,64}$/,
      'A-Z, 0-9, one special character, 8-64 characters long'
    )
    .required('Required, please insert the password'),
});

export const loginUserSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter correct email: example@domain.com')
    .required('Required, please insert the email'),
  password: yup.string().required('Required, please insert the password'),
});
