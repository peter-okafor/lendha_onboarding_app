import { Address } from '@/types';

export type PersonalInfoFormValues = {
  businessName: string; // TODO: might remove this later (reason: not present on UI but on backend)
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  // password: string;
  // confirmPassword: string;
  dateOfBirth: string;
  proofOfResidence: string;
} & Address;

export type VerificationInfoFormValues = {
  nin: string;
  bvn: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  utilityBillFile: string;
  idFile: string;
  passportPhotograph: string;
};

export type BusinessInfoFormValues = {
  businessName: string;
  businessCategory: string;
  businessDesc: string;
  facebookHandle: string;
  twitterHandle: string;
  instagramHandle: string;
  isBusinessRegistered: 'yes' | 'no';
  businessLocationFile?: string;
  hasSourceOfIncome: 'yes' | 'no';
  regNumber?: string;
  certOfIncorporationFile?: string;
  memorandumFile?: string;
  sourceOfIncomeDesc?: string;
} & Address;
