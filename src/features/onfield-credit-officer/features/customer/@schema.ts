import {
  BusinessInfoFormValues,
  PersonalInfoFormValues,
  VerificationInfoFormValues
} from './types';
import * as Yup from 'yup';
import { REG_NUMBER_REGEX } from '@/variables/general';

const PersonalInfoFormSchema = Yup.object<Record<keyof PersonalInfoFormValues, Yup.AnySchema>>({
  businessName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid busines name')
    .required('First name is required'),
  firstName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid first name')
    .required('First name is required'),
  lastName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid last name')
    .required('Last name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Enter a valid phone number')
    .min(10, 'Phone number must be at least 10 characters')
    .required('Phone number is required'),
  // password: Yup.string().required('Password is required'),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //   .required('Passwords must match'),
  addressNumber: Yup.string().required('Address Number is required'),
  streetName: Yup.string().required('Street Name is required'),
  cityTown: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Enter a valid City/Town name')
    .required('City/Town is required'),
  lga: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid LGA')
    .required('LGA is required'),
  state: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid state')
    .required('State is required'),
  nearestLandmark: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid landmark')
    .required('Nearest Landmark is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  proofOfResidence: Yup.mixed().required('Proof of residence is required')
});

const VerificationInfoFormSchema = Yup.object<
  Record<keyof VerificationInfoFormValues, Yup.AnySchema>
>({
  nin: Yup.string()
    .length(11, 'NIN must be 11 characters')
    .matches(/^\d+$/, 'Please enter a valid NIN')
    .required('NIN is required'),
  bvn: Yup.string()
    .length(11, 'BVN must be 11 characters')
    .matches(/^\d+$/, 'Please enter a valid NIN')
    .required('BVN is required'),
  bankName: Yup.string().required('Bank name is required'),
  accountNumber: Yup.string().required('Account number is required'),
  accountName: Yup.string().required('Account name is required'),
  utilityBillFile: Yup.mixed().required('Utility bill is required'),
  idFile: Yup.mixed().required('Government ID is required'),
  passportPhotograph: Yup.mixed().required('Passport photo is required')
});

const BusinessInfoFormSchema = Yup.object<Record<keyof BusinessInfoFormValues, Yup.AnySchema>>({
  businessName: Yup.string().required('Business Name is required'),
  email: Yup.string().required('Email is required'),
  businessCategory: Yup.string().required('Please select a business category'),
  businessDesc: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid business name')
    .required('Business Name is required'),
  facebookHandle: Yup.string().required('Facebook is required'),
  twitterHandle: Yup.string().required('Twitter is required'),
  instagramHandle: Yup.string().required('Instagram is required'),
  addressNumber: Yup.string().required('Address Number is required'),
  streetName: Yup.string().required('Street Name is required'),
  cityTown: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Enter a valid City/Town name')
    .required('City/Town is required'),
  lga: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid LGA')
    .required('LGA is required'),
  state: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid state')
    .required('State is required'),
  nearestLandmark: Yup.string().required('Nearest Landmark is required'),
  businessLocationFile: Yup.mixed().required('Business Location file is required'),
  isBusinessRegistered: Yup.string().required('Registration Status is required'),
  hasSourceOfIncome: Yup.string().required('Do you have a source of income is required'),
  regNumber: Yup.string()
    .matches(REG_NUMBER_REGEX, 'Please enter a valid registration number')
    .when('isBusinessRegistered', (isBusinessRegistered, schema) => {
      if (isBusinessRegistered === 'yes') {
        return schema.required('Registration number is required');
      }
      return schema;
    }),
  // certOfIncorporationFile: Yup.mixed().when(
  //   'isBusinessRegistered',
  //   (isBusinessRegistered, schema) => {
  //     if (isBusinessRegistered === 'yes') {
  //       return schema.required('Certificate of incorporation is required');
  //     }
  //     return schema;
  //   }
  // ),
  // memorandumFile: Yup.mixed().when('isBusinessRegistered', (isBusinessRegistered, schema) => {
  //   if (isBusinessRegistered === 'yes') {
  //     return schema.required('Memorandum and AoA file is required');
  //   }
  //   return schema;
  // }),
  sourceOfIncomeDesc: Yup.string().when('hasSourceOfIncome', (hasSourceOfIncome, schema) => {
    if (hasSourceOfIncome === 'yes') {
      return schema.required('Tell us about your source of income');
    }
    return schema;
  })
});

export const CustomerSchema = {
  Personal: PersonalInfoFormSchema,
  Verification: VerificationInfoFormSchema,
  Business: BusinessInfoFormSchema
};
