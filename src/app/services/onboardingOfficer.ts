import { api } from './api';
import { Officer } from './auth';
import { ENDPOINTS as e } from './_endpoints';

type Business = {
  id: number;
  name: string;
  email: string;
  category: any;
  description: any;
  address_number: any;
  street: any;
  city: any;
  state: any;
  landmark: any;
  user_id: number;
  created_at: string;
  updated_at: string;
  registration_status: false;
  business_registration: any;
};

type User = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  date_of_birth: string;
  state_of_residence: string;
  gender: string;
  address: string;
  created_at: string;
  updated_at: string;
  suspended: number;
  locked: number;
  user_type_id: number;
  referral_channel_id: number;
  branch_id: number;
  officer_id: 7;
  employment_status: string;
  profile_status: string;
  is_defaulting: false;
  onboarding_status: number;
  type: string;
  bank: any;
  cards: any;
  employment: any;
  home_address: {
    id: number;
    number: string;
    street_name: string;
    landmark: string;
    city: string;
    local_government: string;
    state: string;
    user_id: number;
    created_at: string;
    updated_at: string;
  };
  social_media_handles: {
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  next_of_kin: any;
  documents: any;
  business: Business;
};

export interface UserResponse {
  data: {
    current_page: number;
    data: User[];
    first_page_url: string;
    from: 1;
    last_page: 1;
    last_page_url: string;
    next_page_url: any;
    path: string;
    per_page: 50;
    prev_page_url: any;
    to: 2;
    total: 2;
  };
  message: string;
}

export interface LoanResponse {
  data: {
    id: number;
    application_id: string;
    amount: number;
    approved_amount: number;
    request_date: string;
    approval_date: null;
    purpose: string;
    duration: string;
    status: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    merchant_id: number;
    loan_interest_id: number;
    open_duration: string;
    monthly_payment: number;
    total_expected_payment: number;
    last_payment_details: any;
    loan_denial_reason: string;
  }[];
  message: string;
}

export interface CreateUserRequest {
  name: string;
  password: string;
  password_confirmation: string;
  phone_number: string;
  date_of_birth: string;
  business_name: string;
  referral_channel: string;
}

export interface CreateUserResponse {
  data: {
    step: string;
    user: {
      name: string;
      email: string;
      phone_number: string;
      id: number;
    };
  };
  message: string;
}

export interface ApplyLoanRequest {
  loan_amount: number;
  loan_interest_id: number;
  loan_term: number;
  user_id: number;
}

export interface ApplyLoanResponse {
  data: any[];
  message: string;
}

interface CreateHomeAddressRequest {
  number: string;
  street_name: string;
  landmark: string;
  city: string;
  local_government: string;
  state: string;
  user_id: number;
}

interface CreateHomeAddressResponse {
  step: number;
  message: string;
}

interface CreateBankResponse {
  step: number;
  data?: {
    id: number;
    account_number: string;
    account_name: string;
    bank_name: string;
    bvn: string;
    user_id: number;
    nin: string;
  };
  message: string;
}

interface CreateBankRequest {
  bvn: string;
  account_number: string;
  bank: string;
  bank_code: string;
  nin: string;
  user_id: string;
}

interface CreateBusinessRequest {
  business_name: string;
  email: string;
  description: string;
  address_number: string;
  street: string;
  city: string;
  state: string;
  landmark: string;
  user_id: string;
}

type Loan = {
  id: number;
  application_id: string;
  amount: number;
  approved_amount: number;
  request_date: string;
  approval_date: string;
  purpose: string;
  duration: string;
  status: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  merchant_id: number;
  loan_interest_id: number;
  open_duration: string;
  monthly_payment: number;
  total_expected_payment: number;
  last_payment_details: any;
  loan_denial_reason: string;
};

interface LoanDetail {
  data: Loan;
  message: string;
}

export const onboardingOfficerApi = api.injectEndpoints({
  endpoints: (build) => ({
    users: build.query<UserResponse, void>({
      query: () => e.users
    }),
    loans: build.query<LoanResponse, void>({
      query: () => e.loans
    }),
    profile: build.query<Officer, void>({
      query: () => e.profile
    }),
    createUser: build.mutation<CreateUserResponse, CreateUserRequest>({
      query: (credentials) => ({
        url: e.createUser,
        method: 'POST',
        body: credentials
      })
    }),
    createAddress: build.mutation<CreateHomeAddressResponse, CreateHomeAddressRequest>({
      query: (credentials) => ({
        url: e.homeAddress,
        method: 'POST',
        body: credentials
      })
    }),
    loanApply: build.mutation<ApplyLoanResponse, ApplyLoanRequest>({
      query: (credentials) => ({
        url: e.loanApply,
        method: 'POST',
        body: credentials
      })
    }),
    addBank: build.mutation<CreateBankResponse, CreateBankRequest>({
      query: (credentials) => ({
        url: e.addBank,
        method: 'POST',
        body: credentials
      })
    }),
    addBusiness: build.mutation<
      {
        step: number;
        message: string;
      },
      CreateBusinessRequest
    >({
      query: (credentials) => ({
        url: e.addBusiness,
        method: 'POST',
        body: credentials
      })
    }),
    getUserDetail: build.query<
      {
        data: User;
        message: string;
      },
      { user_id: number }
    >({
      query: (params) => ({
        url: e.userDetail({ user_id: params.user_id.toString() }),
        method: 'GET'
      })
    }),
    getLoanDetail: build.query<LoanDetail, { loan_id: number }>({
      query: (params) => ({
        url: e.loanDetail({ loan_id: params.loan_id.toString() }),
        method: 'GET'
      })
    })
  })
});

export const {
  useLoansQuery,
  useUsersQuery,
  useProfileQuery,
  useLoanApplyMutation,
  useCreateUserMutation,
  useCreateAddressMutation,
  useAddBankMutation,
  useAddBusinessMutation,
  useGetUserDetailQuery,
  useGetLoanDetailQuery
} = onboardingOfficerApi;

export const {
  endpoints: { profile, loanApply, createUser, createAddress, getUserDetail }
} = onboardingOfficerApi;
