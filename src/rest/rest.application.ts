import { Config, RestSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(
    private readonly logger: Logger,
    private readonly config: Config<RestSchema>
  ) {}

  public init() {
    this.logger.info('App init');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
