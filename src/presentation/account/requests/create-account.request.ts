import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, Length, MaxLength } from 'class-validator';

export class CreateAccountRequest {
  @ApiProperty({
    description: 'Account document',
    example: '00000000000',
  })
  @Length(11, 11)
  @IsNotEmpty()
  @IsNumberString()
  cpf: string;

  @ApiProperty({
    description: 'Account name',
    example: 'Jon Snow',
  })
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
