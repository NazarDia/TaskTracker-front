import * as yup from 'yup';

export const registerUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  email: yup
    .string()
    .trim()
    .email()
    .required('Required, please insert the email'),
  password: yup
    .string()
    .trim()
    .min(4, 'Too short!')
    .required('Required, please insert the password'),
});

export const loginUserSchema = yup.object().shape({
  email: yup
    .string()
    .email('Incorrect Email, please enter correct email example@domain.com')
    .required('Required, please insert the email'),
  password: yup.string().required('Required, please insert the password'),
});
