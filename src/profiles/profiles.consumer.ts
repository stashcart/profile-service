import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { ProfilesService } from './profiles.service';

@Injectable()
export class ProfilesConsumer {
  constructor(private readonly profilesService: ProfilesService) {}

  @RabbitSubscribe({
    exchange: 'user.write',
    routingKey: 'user.created',
    queue: 'profile-service-queue',
  })
  createProfile(userDto: UserDto) {
    this.profilesService.createFromUser(userDto);
  }
}
