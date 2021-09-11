import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isDefined } from 'class-validator';
import { AmqpService } from 'src/amqp/amqp.service';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilePatchRequestDto } from './dto/profile-patch.request.dto';
import { ProfileDto } from './dto/profile.dto';
import { UserDto } from './dto/user.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly amqpService: AmqpService
  ) {}

  findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  async findById(id: string): Promise<Profile> {
    const profile = await this.profileRepository.findOne(id);

    if (!profile) {
      throw new NotFoundException(`Profile: ${id}`);
    }

    return profile;
  }

  async create(profileDto: CreateProfileDto): Promise<Profile> {
    const profile = new Profile();
    profile.email = profileDto.email;
    profile.name = profileDto.name;
    profile.phone = profileDto.phone;

    return this.saveAndPublishProfile(profile);
  }

  private async saveAndPublishProfile(profile: Profile): Promise<Profile> {
    const savedProfile = await this.profileRepository.save(profile);

    await this.amqpService.publish(
      'profile.write',
      'profile.created',
      new ProfileDto(savedProfile)
    );

    return savedProfile;
  }

  async createFromUser(userDto: UserDto): Promise<Profile> {
    const profile = new Profile();
    profile.id = userDto.id;
    profile.email = userDto.email;

    return this.saveAndPublishProfile(profile);
  }

  async patch(
    id: string,
    profilePatchDto: ProfilePatchRequestDto
  ): Promise<Profile> {
    const profile = await this.findById(id);

    if (isDefined(profilePatchDto.name)) {
      profile.name = profilePatchDto.name;
    }
    if (isDefined(profilePatchDto.phone)) {
      profile.phone = profilePatchDto.phone;
    }
    if (isDefined(profilePatchDto.email)) {
      profile.email = profilePatchDto.email;
    }

    const savedProfile = await this.profileRepository.save(profile);

    await this.amqpService.publish(
      'profile.write',
      'profile.updated',
      new ProfileDto(savedProfile)
    );

    return savedProfile;
  }
}
