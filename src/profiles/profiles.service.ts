import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(private readonly profileRepository: Repository<Profile>) {}

  findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  findById(id: number): Promise<Profile> {
    return this.profileRepository.findOne(id);
  }

  createFromUser(userDto: UserDto): Promise<Profile> {
    const profile = new Profile();
    profile.id = userDto.id;
    profile.email = userDto.email;

    // TODO: Add event

    return this.profileRepository.save(profile);
  }

  // TODO: Patch profile
}
