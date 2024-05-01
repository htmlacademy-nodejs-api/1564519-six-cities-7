import { User } from '../User.interface.js';

export interface Publishable {
  publicationDate: string;
  author: User;
  rating: number;
}
