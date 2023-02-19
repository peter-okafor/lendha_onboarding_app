export const ENDPOINTS = {
  login: 'auth/login',
  logout: 'auth/logout',
  signup: 'auth/signup',
  passwordReset: 'password/create',

  users: 'onboarding_officer/users',
  loans: 'onboarding_officer/loans',
  profile: 'onboarding_officer/profile',
  createUser: 'onboarding_officer/create_user',
  homeAddress: 'onboarding_officer/onboarding/home_address',
  loanApply: 'onboarding_officer/loan_application',
  addBank: 'onboarding_officer/onboarding/bank',
  addBusiness: 'onboarding_officer/onboarding/business',
  userDetail: ({ user_id }: { user_id: string }) => `onboarding_officer/user?user_id=${user_id}`,
  loanDetail: ({ loan_id }: { loan_id: string }) => `onboarding_officer/loan?loan_id=${loan_id}`,

  bankList: 'bank/list',
  accountName: ({ code, number }: { code: string; number: string }) =>
    `bank/account_name/bank/${code}/account/${number}`,

  referralChannels: 'referral_channel',
  loanInterests: 'loan_interests'
};
