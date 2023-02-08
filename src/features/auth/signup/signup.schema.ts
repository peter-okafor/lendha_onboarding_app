import * as Yup from 'yup';
import { SignupFormValues } from './Signup';

export const SignupSchema = Yup.object<Record<keyof SignupFormValues, Yup.AnySchema>>({
  firstname: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid first name')
    .required('Firstname is required'),
  lastname: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid last name')
    .required('Lastname is required'),
  businessName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid business name')
    .required('Business name is required'),

  email: Yup.string().email('Enter a valid email').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]+$/, 'Enter a valid phone number')
    .min(10, 'Phone number must be at least 10 characters')
    .required('Phone number is required'),
  dateOfBirth: Yup.string().required('Date of birth is required'),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/,
      '8 characters . Uppercase . lowercase . special character.'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Passwords must match'),
  referral: Yup.string().required('Please select a referral channel')
});

export const VerifyEmailSchema = Yup.object().shape({
  code: Yup.string().required('Verification code is required')
});
