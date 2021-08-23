import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfilesConsumer {
  @RabbitSubscribe({
    exchange: 'user',
    routingKey: 'user.created',
    queue: 'profile-service-queue',
  })
  createProfile(userDto: unknown) {
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(userDto));
  }
}
