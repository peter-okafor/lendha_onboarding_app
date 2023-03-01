import { Address } from '@/types';

export type PersonalInfoFormValues = {
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
};

export type VerificationInfoFormValues = {
  nin: string;
  bvn: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
};

export type BusinessInfoFormValues = {
  businessName: string;
  businessDesc: string;
  email: string;
} & Omit<Address, 'lga'>;
