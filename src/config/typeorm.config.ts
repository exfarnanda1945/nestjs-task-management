import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { entities } from 'src/entities';

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  useFactory: () => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [...entities],
    synchronize: true,
    logging: ['error'],
  }),
};
