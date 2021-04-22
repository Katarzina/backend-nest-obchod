import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  mongoURI: `mongodb://mongo:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`, // ${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@
  redisURI: `redis://:${process.env.REDIS_PASSWORD}@0.0.0.0:${process.env.REDIS_PORT}/4`,
}));
