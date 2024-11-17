import mongoose, { Model, FilterQuery, UpdateQuery } from 'mongoose';
export declare abstract class BaseRepository<T> {
    protected readonly model: Model<T>;
    constructor(model: Model<T>);
    create(data: any): Promise<T>;
    find(filter: FilterQuery<T>): Promise<T[]>;
    findOne(filter: FilterQuery<T>): Promise<T | null>;
    findById(id: mongoose.Types.ObjectId): Promise<T | null>;
    update(id: mongoose.Types.ObjectId, update: UpdateQuery<T>): Promise<T | null>;
    updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>, options?: {
        upsert?: boolean;
    }): Promise<T | null>;
    delete(id: mongoose.Types.ObjectId): Promise<T | null>;
    deleteOne(filter: FilterQuery<T>): Promise<T | null>;
    deleteMany(filter: FilterQuery<T>): Promise<number>;
}
