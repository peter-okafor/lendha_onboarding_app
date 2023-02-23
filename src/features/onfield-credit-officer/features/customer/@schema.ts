// import { REG_NUMBER_REGEX } from '@/variables/general';
import { Address } from '@/types';
import { REG_NUMBER_REGEX } from '@/variables/general';
import * as Yup from 'yup';
import { BusRegFormValues } from './components/BusinessRegForm';
import {
  BusinessInfoFormValues,
  PersonalInfoFormValues,
  VerificationInfoFormValues
} from './types';

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
  dateOfBirth: Yup.string().required('Date of Birth is required')
});

const AddressInfoFormSchema = Yup.object<Record<keyof Address, Yup.AnySchema>>({
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
    .required('Nearest Landmark is required')
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
  accountName: Yup.string().required('Account name is required')
});

const BusinessInfoFormSchema = Yup.object<Record<keyof BusinessInfoFormValues, Yup.AnySchema>>({
  businessName: Yup.string().required('Business Name is required'),
  email: Yup.string().required('Email is required'),
  businessDesc: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid business name')
    .required('Business Name is required'),
  addressNumber: Yup.string().required('Address Number is required'),
  streetName: Yup.string().required('Street Name is required'),
  cityTown: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Enter a valid City/Town name')
    .required('City/Town is required'),
  state: Yup.string()
    .matches(/^[aA-zZ\s]+$/, 'Please enter a valid state')
    .required('State is required'),
  nearestLandmark: Yup.string().required('Nearest Landmark is required')
});

const BusinessRegFormSchema = Yup.object<Record<keyof BusRegFormValues, Yup.AnySchema>>({
  busRegNumber: Yup.string()
    .matches(REG_NUMBER_REGEX, 'Please enter a valid registration number')
    .required('Registration number is required'),
  cacDocument: Yup.mixed().required('CAC document is required')
});

export const CustomerSchema = {
  Personal: PersonalInfoFormSchema,
  Address: AddressInfoFormSchema,
  Verification: VerificationInfoFormSchema,
  Business: BusinessInfoFormSchema,
  BusinessReg: BusinessRegFormSchema
};
