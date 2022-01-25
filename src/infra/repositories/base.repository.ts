import { Document, Model } from 'mongoose';
import { BaseRepositoryInterfacec } from 'src/domain/repositories/base-repository.interface';

export abstract class BaseRepository<TDocument extends Document>
  implements BaseRepositoryInterfacec<TDocument>
{
  constructor(private readonly model: Model<TDocument>) {}

  async create<T>(data: T): Promise<TDocument> {
    const createdData = new this.model(data);
    return createdData.save();
  }
}
