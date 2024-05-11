import dayjs from 'dayjs';

import {
  generateRandomValue,
  getRandomItem,
  getRandomItems,
} from '../../helpers/common.js';
import { MockServerData } from '../../types/MockServerData.js';
import { OfferGenerator } from './offerGenerator.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const { amenities, ...rest } = this.mockData;
    const amenitiesOutput = JSON.stringify(getRandomItems(amenities));
    const restOutput = Object.values(rest).map((el) =>
      JSON.stringify(getRandomItem<(typeof el)[number]>(el))
    );

    const [isPremium, isFavorite] = Array.from({ length: 2 }, () =>
      getRandomItem([true, false])
    );
    const [roomCount, guestCount, commentCount] = Array.from(
      { length: 3 },
      () => generateRandomValue(1, 10)
    );
    const rent = generateRandomValue(1000, 10000);
    const rating = generateRandomValue(1, 5, 1);

    const publicatonDate = JSON.stringify(
      dayjs()
        .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
        .toISOString()
    );

    return [
      ...restOutput,
      amenitiesOutput,
      isFavorite,
      isPremium,
      roomCount,
      guestCount,
      commentCount,
      rent,
      rating,
      publicatonDate,
    ].join('\t');
  }
}
