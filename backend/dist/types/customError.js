"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorClass = void 0;
class CustomErrorClass extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}
exports.CustomErrorClass = CustomErrorClass;
//# sourceMappingURL=customError.js.map