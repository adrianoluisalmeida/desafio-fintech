import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class TransferAccountRequest {
  @ApiProperty({
    description: 'AccountId receiver',
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsMongoId()
  accountId: string;

  @ApiProperty({
    description: 'Amount value to transfer',
    example: 1000,
  })
  value: number;
}
