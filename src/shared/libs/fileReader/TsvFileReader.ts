import EventEmitter from 'node:events';

import { RentOffer } from '../../entities/RentOffer.interface.js';
import { FileReader } from './FileReader.interface.js';

import { Housings } from '../../constants/Housings.js';
import { createReadStream } from 'node:fs';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384;

  constructor(private readonly filename: string) {
    super();
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
