import { Amenities } from '../constants/Amenities.js';
import { Housings } from '../constants/Housings.js';
import { User } from '../entities/User.interface.js';
import { City } from './City.type.js';
import { Place } from './Place.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: City[];
  previewImages: string[];
  images: string[][];
  housingTypes: Housings[];
  amenities: Amenities[];
  placeCoordinates: Place[];
  authors: User[];
};
