import { Profile } from '../entities/profile.entity';

export class ProfileDto {
  id: number;

  email: string;

  name: string;

  phone: string;

  constructor(profile: Profile) {
    this.id = profile.id;
    this.email = profile.email;
    this.name = profile.name;
    this.phone = profile.phone;
  }
}
