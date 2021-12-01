import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class CreateProfileRequestDto {
  @ApiProperty({
    example: `user-${Math.floor(Math.random() * 10000)}@gmail.com`,
  })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'John Wick' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '0981234567' })
  @IsOptional()
  @Matches(/\d{10}/)
  @IsString()
  phone?: string;
}
