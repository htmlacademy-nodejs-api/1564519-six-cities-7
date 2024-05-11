import { RentOffer } from '../../shared/entities/RentOffer.interface.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { TSVFileReader } from '../../shared/libs/fileReader/TsvFileReader.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  private onImportedOffer(offer: RentOffer): void {
    console.info(offer);
  }

  private onCompleteImport(count: number): void {
    console.info(`${count} rows imported.`);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.addListener('line', this.onImportedOffer);
    fileReader.addListener('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (e) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(e));
    }
  }
}
