import { readFileSync } from 'node:fs';

import { RentOffer } from '../../entities/RentOffer.interface.js';
import { FileReader } from './FileReader.interface.js';
import { Amenities, User } from '../../entities/index.js';

import { Housings } from '../../constants/Housings.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): RentOffer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.length !== 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): RentOffer {
    const [
      title,
      description,
      publicationDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      housingType,
      roomCount,
      guestCount,
      rent,
      amenities,
      name,
      email,
      password,
      status,
      commentCount,
      latitude,
      longitude,
    ] = line.split('\t');

    return {
      title,
      description,
      publicationDate: new Date(publicationDate),
      city,
      previewImage,
      images: images.split(';'),
      isPremium: !!isPremium,
      isFavorite: !!isFavorite,
      rating: +rating,
      housingType: Housings[housingType as Housings],
      roomCount: +roomCount,
      guestCount: +guestCount,
      rent: +rent,
      amenities: this.parseAmenities(amenities),
      author: this.parseAuthor(
        name,
        email,
        password,
        status as 'pro' | 'common'
      ),
      commentCount: +commentCount,
      placeCoordinates: { latitude: +latitude, longitude: +longitude },
    };
  }

  private parseAuthor(
    name: string,
    email: string,
    password: string,
    status: 'pro' | 'common'
  ): User {
    return {
      name,
      email,
      password,
      status,
    };
  }

  private parseAmenities(input: string): Amenities[] {
    return input.split(';') as Amenities[];
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): RentOffer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
