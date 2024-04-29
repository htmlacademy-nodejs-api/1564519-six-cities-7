import { Publishable } from './Publishable.js';

export interface Comment extends Publishable {
  text: string;
}
