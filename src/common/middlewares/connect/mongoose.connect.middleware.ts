import { ConfigModule, ConfigService } from '@nestjs/config';

export const MongooseConnectMiddleware = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    uri: config.get<string>('database.mongoURI'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // make Schema allows indexes
  }),
  inject: [ConfigService],
};
