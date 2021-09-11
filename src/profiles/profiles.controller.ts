import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileRequestDto } from './dto/create-profile.request.dto';
import { ProfilePatchRequestDto } from './dto/profile-patch.request.dto';
import { ProfileDto } from './dto/profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
@ApiTags('Profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  async findAll(): Promise<ProfileDto[]> {
    const profiles = await this.profilesService.findAll();
    return profiles.map((profile) => new ProfileDto(profile));
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ProfileDto> {
    const profile = await this.profilesService.findById(id);
    return new ProfileDto(profile);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() profilePatchRequestDto: ProfilePatchRequestDto
  ): Promise<ProfileDto> {
    const profile = await this.profilesService.patch(
      id,
      profilePatchRequestDto
    );
    return new ProfileDto(profile);
  }

  @Post()
  async create(
    @Body() createProfileDto: CreateProfileRequestDto
  ): Promise<ProfileDto> {
    const profile = await this.profilesService.create(createProfileDto);
    return new ProfileDto(profile);
  }
}
