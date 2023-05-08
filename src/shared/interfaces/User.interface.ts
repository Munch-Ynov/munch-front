export interface User {
  id: string;
  firstName?: string;
  lastName: string;
  email: string;
  favoris?: string;
  admin: boolean;
  phone?: string;
}

export interface UserForm extends Partial<User> {}

export interface LoginForm {
  password: string;
  email: string;
}
