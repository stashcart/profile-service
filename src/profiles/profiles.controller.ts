import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfilePatchDto } from './dto/profile-patch.dto';
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
  async findById(@Param() id: number): Promise<ProfileDto> {
    const profile = await this.profilesService.findById(id);

    return new ProfileDto(profile);
  }

  @Patch(':id')
  async patch(
    @Param() id: number,
    @Body() profilePatchDto: ProfilePatchDto
  ): Promise<ProfileDto> {
    const profile = await this.profilesService.patch(id, profilePatchDto);

    return new ProfileDto(profile);
  }
}
