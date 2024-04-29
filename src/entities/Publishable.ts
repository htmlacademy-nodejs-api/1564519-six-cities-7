import { User } from './User.js';

export interface Publishable {
  publicationDate: string;
  author: User;
  rating: number;
}
