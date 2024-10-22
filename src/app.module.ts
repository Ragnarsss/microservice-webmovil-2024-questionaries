import { Module } from '@nestjs/common';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { DatabaseModule } from './database/database.module';
import config from './config';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    QuestionnaireModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
        AMQP_URL: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
