import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAccount } from 'src/domain/entities/IAccount';

@Schema()
export class Account implements IAccount {
  @Prop({ required: true })
  cpf: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: Date.now })
  createdAt?: Date;
}

export const AccountSchema = SchemaFactory.createForClass(Account);

export type AccountDocument = Account & Document;
