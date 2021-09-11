import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class CreateProfileDto {
  @IsEmail()
  email: string;

  name: string;

  @ApiProperty({ example: '0981234567' })
  @Matches(/\d{10}/)
  @IsString()
  phone: string;
}
