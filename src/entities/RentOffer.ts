import { Place } from './Place.js';
import { Publishable } from './Publishable.js';

export interface RentOffer extends Publishable {
  title: string;
  description: string;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  housingType: 'apartment' | 'house' | 'room' | 'hotel';
  roomCount: number;
  guestCount: number;
  rent: number;
  amenities:
    | 'Breakfast'
    | 'Air conditioning'
    | 'Laptop friendly workspace'
    | 'Baby seat'
    | 'Washer'
    | 'Towels'
    | 'Fridge';
  commentCount: number;
  placeCoordinates: Place;
}
