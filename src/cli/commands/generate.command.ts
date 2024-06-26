import got from 'got';

import { MockServerData } from '../../shared/types/MockServerData.js';
import { Command } from './command.interface.js';
import { TSVOfferGenerator } from '../../shared/libs/offerGenerator/tsvOfferGenerator.js';
import { TSVFileWriter } from '../../shared/libs/fileWriter/tsvFileWriter.js';
import { getErrorMessage } from '../../shared/helpers/index.js';

const RADIX = 10;

export class GenerateCommand implements Command {
  private initialData: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, RADIX);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (e) {
      console.error('Cannot generate data');

      console.error(getErrorMessage(e));
    }
  }
}
