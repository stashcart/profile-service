import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfilesConsumer } from './profiles.consumer';
import { Profile } from './entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfilesConsumer],
})
export class ProfilesModule {}
