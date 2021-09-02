import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class ProfilePatchRequestDto {
  @ApiProperty({ example: 'John Wick' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '0981234567' })
  @Matches(/\d{10}/)
  @IsOptional()
  @IsString()
  phone?: string;
}
