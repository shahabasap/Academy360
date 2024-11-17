"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        const createdEntity = new this.model(data);
        const savedEntity = await createdEntity.save();
        return savedEntity.toObject();
    }
    async find(filter) {
        return await this.model.find(filter);
    }
    async findOne(filter) {
        return await this.model.findOne(filter);
    }
    async findById(id) {
        return await this.model.findById(id);
    }
    async update(id, update) {
        return await this.model.findByIdAndUpdate(id, update, { new: true });
    }
    async updateOne(filter, update, options = {}) {
        return await this.model.findOneAndUpdate(filter, update, {
            new: true,
            upsert: options.upsert,
        });
    }
    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }
    async deleteOne(filter) {
        return await this.model.findOneAndDelete(filter);
    }
    async deleteMany(filter) {
        const result = await this.model.deleteMany(filter);
        return result.deletedCount;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=baseRepository.js.map