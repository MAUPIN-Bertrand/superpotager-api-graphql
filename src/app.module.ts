import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { GardenModule } from './garden/garden.module';
import { GardenEntity } from './garden/garden.entity';
import { PlantModule } from './plant/plant.module';
import { PlantEntity } from './plant/plant.entity';

import config = require('config');

const databaseConfig = config.get('database');
const serverConfig = config.get('server');

const rootURI = process.env.DB_ROOT_URI || databaseConfig.root;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      useNewUrlParser: true,
      type: 'mongodb',
      url: rootURI,
      synchronize: true,
      useUnifiedTopology: true,
      entities: [UserEntity, GardenEntity, PlantEntity],
      w: 'majority',
    }),
    GraphQLModule.forRoot({
      autoSchemaFile:
        process.env.NODE_ENV === 'development'
          ? '../superpotager-graphql-schema/schema.gql'
          : true,
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
      cors: {
        credentials: true,
        origin: serverConfig.origin
          ? serverConfig.origin
          : 'http://localhost:2000',
      },
      formatError: error => {
        console.error('error', error);
        return error;
      },
      introspection: false,
      playground:
        process.env.NODE_ENV === 'development'
          ? {
              settings: {
                'request.credentials': 'include',
              },
            }
          : false,
    }),
    UserModule,
    AuthModule,
    GardenModule,
    PlantModule,
  ],
})
export class AppModule {}
