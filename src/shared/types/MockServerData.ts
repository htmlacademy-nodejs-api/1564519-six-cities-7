import { Amenities } from '../constants/Amenities.js';
import { Housings } from '../constants/Housings.js';
import { User } from '../entities/User.interface.js';
import { City } from './City.type.js';
import { Place } from './Place.type.js';

export type MockServerData = {
  title: string[];
  description: string[];
  city: City[];
  previewImage: string[];
  images: string[][];
  housingType: Housings[];
  amenities: Amenities[];
  placeCoordinates: Place[];
  pubpublicationDate: string[];
  author: User[];
};
