import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  firstname: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid first name')
    .required('Firstname is required'),
  lastname: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid last name')
    .required('Lastname is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Enter a valid phone number')
    .min(10, 'Phone number must be at least 10 characters')
    .required('Phone number is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      '8 characters . Uppercase . lowercase . special character.'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Passwords must match')
});

export const VerifyEmailSchema = Yup.object().shape({
  code: Yup.string().required('Verification code is required')
});
