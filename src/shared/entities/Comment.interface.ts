import { Publishable } from './utils/Publishable.interface.js';

export interface Comment extends Publishable {
  text: string;
}
