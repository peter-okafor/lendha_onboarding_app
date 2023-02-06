import * as Yup from 'yup';

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required')
});

export const ResetPasswordSchema = Yup.object().shape({
  code: Yup.string().required('Reset code is required')
});

export const NewPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password does not match')
});
