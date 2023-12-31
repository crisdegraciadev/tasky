import { User } from '@angular/fire/auth';

export type AuthUser = User | null | undefined;

export type AuthState = {
  user: AuthUser;
  status: string;
};

export type Credentials = {
  email: string;
  password: string;
};
