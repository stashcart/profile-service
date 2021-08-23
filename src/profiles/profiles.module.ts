import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { ProfilesConsumer } from './profiles.consumer';

@Module({
  controllers: [ProfilesController],
  providers: [ProfilesService, ProfilesConsumer],
})
export class ProfilesModule {}
