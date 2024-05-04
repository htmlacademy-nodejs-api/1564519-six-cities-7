import { TSVFileReader } from '../../shared/libs/fileReader/TsvFileReader.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (e) {
      if (!(e instanceof Error)) {
        throw e;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${e.message}`);
    }
  }
}
