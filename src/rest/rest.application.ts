import { Logger } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(private readonly logger: Logger) {}

  public init() {
    this.logger.info('App init');
  }
}
