"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentAuthRoutes_1 = __importDefault(require("./studentAuthRoutes"));
const teacherAuthRoutes_1 = __importDefault(require("./teacherAuthRoutes"));
const adminAuthRoutes_1 = __importDefault(require("./adminAuthRoutes"));
const router = express_1.default.Router();
router.use('/student', studentAuthRoutes_1.default);
router.use('/teacher', teacherAuthRoutes_1.default);
router.use('/admin', adminAuthRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map