import { api } from './api';
import { Officer } from './auth';
import { ENDPOINTS as e } from './_endpoints';

export interface LoanResponse {
  data: any[];
  message: string;
}

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
      id: number;
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
    })
  })
});

export const { useLoansQuery, useUsersQuery, useProfileQuery } = onboardingOfficerApi;

export const {
  endpoints: { profile }
} = onboardingOfficerApi;
