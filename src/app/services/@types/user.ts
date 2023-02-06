export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password?: string;
}

export interface UserResponse {
  status: boolean;
  message: string;
  data: {
    user: User & {
      id: string;
      next_activation_stage: string;
    };
    auth_token: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}
