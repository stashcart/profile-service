import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class ProfilePatchDto {
  @ApiProperty({ example: 'John Wick' })
  name?: string;

  @Matches(/\d{10}/)
  @ApiProperty({ example: '0981234567' })
  phone?: string;
}
