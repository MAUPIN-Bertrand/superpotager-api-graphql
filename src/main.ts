import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config = require('config');
import session = require('express-session');
import passport = require('passport');
import connectMongodbSession = require('connect-mongodb-session');

async function bootstrap() {
  const serverConfig = config.get('server');
  const MongoDBStore = connectMongodbSession(session);
  const cookieSecret = process.env.COOKIE_SECRET || serverConfig.secret;
  const databaseConfig = config.get('database');
  const sessionURI = process.env.DB_SESSION_URI || databaseConfig.session;

  const corsOptions = {
    origin: serverConfig.origin ? serverConfig.origin : 'http://localhost:2000',
    credentials: true,
  };

  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);
  app.use(
    session({
      secret: cookieSecret,
      name: 'superpotager-session',
      resave: false,
      saveUninitialized: false,
      store: new MongoDBStore({
        uri: sessionURI,
        collection: 'superpotagerSessions',
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
}
bootstrap();
