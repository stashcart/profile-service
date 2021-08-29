import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmqpModule } from './amqp/amqp.module';
import { AppController } from './app.controller';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        database: configService.get('DB_NAME'),
        password: configService.get('DB_PASSWORD'),
        autoLoadEntities: true,
        logging: true,
        synchronize: true,
      }),
    }),
    AmqpModule,
    ProfilesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
