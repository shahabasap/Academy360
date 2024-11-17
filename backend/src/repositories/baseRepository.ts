import mongoose, { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async create(data: any): Promise<T> {
    const createdEntity = new this.model(data);
    const savedEntity = await createdEntity.save();
    return savedEntity.toObject() as T;
  }

  async find(filter: FilterQuery<T>): Promise<T[]> {
    return await this.model.find(filter);
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(filter);
  }

  async findById(id: mongoose.Types.ObjectId): Promise<T | null> {
    return await this.model.findById(id);
  }

  async update(id: mongoose.Types.ObjectId, update: UpdateQuery<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, update, { new: true });
  }

  async updateOne(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
    options: { upsert?: boolean } = {}
  ): Promise<T | null> {
    return await this.model.findOneAndUpdate(filter, update, {
      new: true,
      upsert: options.upsert,
    });
  }

  async delete(id: mongoose.Types.ObjectId): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }

  async deleteOne(filter: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOneAndDelete(filter);
  }

  async deleteMany(filter: FilterQuery<T>): Promise<number> {
    const result = await this.model.deleteMany(filter); 
    return result.deletedCount; 
}
}