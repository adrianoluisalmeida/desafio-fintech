import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AccountInterface } from 'src/domain/entities/account.interface';

@Schema()
export class Account implements AccountInterface {
  @Prop({ required: true })
  cpf: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt?: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

export type AccountDocument = Account & Document;
