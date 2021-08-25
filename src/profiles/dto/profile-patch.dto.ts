import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, Matches } from 'class-validator';

export class ProfilePatchDto {
  @ApiProperty({ example: 'John Wick' })
  @IsDefined()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '0981234567' })
  @Matches(/\d{10}/)
  @IsDefined()
  @IsOptional()
  phone?: string;
}
