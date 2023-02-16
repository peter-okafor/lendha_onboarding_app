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
  user_id: 7602;
  created_at: string;
  updated_at: string;
  registration_status: false;
  business_registration: any;
};

export interface UserResponse {
  data: {
    current_page: number;
    data: {
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
      home_address: any;
      social_media_handles: any;
      next_of_kin: any;
      documents: any;
      business: Business;
    }[];
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
  };
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
    createAddress: build.mutation<CreateUserResponse, CreateUserRequest>({
      query: (credentials) => ({
        url: e.homeAddress,
        method: 'POST',
        body: credentials
      })
    })
  })
});

export const { useLoansQuery, useUsersQuery, useProfileQuery } = onboardingOfficerApi;

export const {
  endpoints: { profile }
} = onboardingOfficerApi;
