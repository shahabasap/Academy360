"use strict";
// src/middleware/errorHandler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err); // For logging purposes
    res.status(err.status || 500).json({ message: err.message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map