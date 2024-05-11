import { Place, City } from '../types/index.js';
import { Publishable } from './utils/Publishable.interface.js';

import { Amenities, Housings } from '../constants/index.js';

export interface RentOffer extends Publishable {
  title: string;
  description: string;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  housingType: Housings;
  roomCount: number;
  guestCount: number;
  rent: number;
  amenities: Amenities[];
  commentCount: number;
  placeCoordinates: Place;
}
