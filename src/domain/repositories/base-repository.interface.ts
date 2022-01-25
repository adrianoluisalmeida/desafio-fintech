import { Document } from 'mongoose';

export interface BaseRepositoryInterfacec<TDocument extends Document> {
  create<T>(data: T): Promise<TDocument>;
}
