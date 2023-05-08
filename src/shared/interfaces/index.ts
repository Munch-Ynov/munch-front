export interface User {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  admin: boolean;
  favoris: string;
  phone: string;
}

export interface UserForm extends Partial<User> {}

export interface LoginForm {
  password: string;
  email: string;
}
