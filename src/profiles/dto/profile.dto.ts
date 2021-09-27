import { Profile } from '../entities/profile.entity';

export class ProfileDto {
  id: string;

  email: string | null;

  name: string | null;

  phone: string | null;

  constructor(profile: Profile) {
    this.id = profile.id;
    this.email = profile.email ?? null;
    this.name = profile.name ?? null;
    this.phone = profile.phone ?? null;
  }
}
