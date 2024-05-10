import { readFileSync } from 'node:fs';

import { RentOffer } from '../../entities/RentOffer.interface.js';
import { FileReader } from './FileReader.interface.js';

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
      city,
      previewImage,
      images,
      housingType,
      place,
      user,
      amenities,
      isPremium,
      isFavorite,
      roomCount,
      guestCount,
      commentCount,
      rent,
      rating,
      publicationDate,
    ] = line.split('\t').map((el) => JSON.parse(el));

    return {
      title,
      description,
      publicationDate: new Date(publicationDate),
      city,
      previewImage,
      images,
      isPremium: !!isPremium,
      isFavorite: !!isFavorite,
      rating: +rating,
      housingType: Housings[housingType as Housings],
      roomCount: +roomCount,
      guestCount: +guestCount,
      rent: +rent,
      amenities,
      author: user,
      commentCount: +commentCount,
      placeCoordinates: place,
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): RentOffer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
