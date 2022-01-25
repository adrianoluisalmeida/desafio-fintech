import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MovementInterface } from 'src/domain/entities/movement.interface';

@Schema()
export class Movement implements MovementInterface {
  @Prop({ required: true })
  accountId: string;

  @Prop({ required: true })
  value: number;

  @Prop({ default: Date.now })
  createdAt?: Date;
}

export const MovementSchema = SchemaFactory.createForClass(Movement);

export type MovementDocument = Movement & Document;
