import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class ProfilePatchRequestDto {
  @ApiProperty({ example: 'John Wick' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: `user-${Math.floor(Math.random() * 10000)}@gmail.com`,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '0981234567' })
  @Matches(/\d{10}/)
  @IsOptional()
  @IsString()
  phone?: string;
}
