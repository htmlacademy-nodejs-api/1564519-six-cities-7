import { User } from '../User.interface.js';

export interface Publishable {
  publicationDate: Date;
  author: User;
  rating: number;
}
