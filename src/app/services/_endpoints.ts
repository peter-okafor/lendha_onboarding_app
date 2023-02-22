export const ENDPOINTS = {
  login: 'auth/login',
  logout: 'auth/logout',
  signup: 'auth/signup',
  passwordReset: 'password/create',

  users: ({ page = 1 }: { page: number }) => `onboarding_officer/users?page=${page}`,
  // users: 'onboarding_officer/users',
  loans: 'onboarding_officer/loans',
  profile: 'onboarding_officer/profile',
  createUser: 'onboarding_officer/create_user',
  homeAddress: 'onboarding_officer/onboarding/home_address',
  loanApply: 'onboarding_officer/loan_application',
  addBank: 'onboarding_officer/onboarding/bank',
  addBusiness: 'onboarding_officer/onboarding/business',
  userDetail: ({ user_id }: { user_id: string }) => `onboarding_officer/user?user_id=${user_id}`,
  loanDetail: ({ loan_id }: { loan_id: string }) => `onboarding_officer/loan?loan_id=${loan_id}`,

  uploadProofOfResidence: 'onboarding_officer/onboarding/documents/residence_proof',
  uploadValidId: 'onboarding_officer/onboarding/documents/valid_id',
  uploadPhotograph: 'onboarding_officer/onboarding/documents/passport_photo',

  bankList: 'bank/list',
  accountName: ({ code, number }: { code: string; number: string }) =>
    `bank/account_name/bank/${code}/account/${number}`,

  referralChannels: 'referral_channel',
  loanInterests: 'loan_interests',
  loanSearch: ({ search }: { search: string }) => `onboarding_officer/search?search=${search}`
};
