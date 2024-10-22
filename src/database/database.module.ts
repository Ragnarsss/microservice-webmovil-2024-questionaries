import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from 'src/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        return {
          uri: `${connection}://${user}:${password}@${host}:${port}/${dbName}?authSource=admin`,
          user,
          pass: password,
          dbName,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
