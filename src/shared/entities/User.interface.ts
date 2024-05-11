import { UserStatus } from '../types/index.js';

export interface User {
  name: string;
  email: string;
  avatar: string | null; // изображение
  password: string;
  status: UserStatus;
}
