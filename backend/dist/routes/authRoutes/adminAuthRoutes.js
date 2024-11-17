"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAuthController_1 = __importDefault(require("../../controllers/authController/adminAuthController"));
const adminServices_1 = __importDefault(require("../../services/adminServices"));
const jwtUtility_1 = __importDefault(require("../../utils/jwtUtility"));
const password_1 = __importDefault(require("../../utils/password"));
const adminAuthRoutes = (0, express_1.Router)();
const passwordUtility = new password_1.default();
const adminServices = new adminServices_1.default(passwordUtility);
const jwtUtility = new jwtUtility_1.default();
const adminAuthController = new adminAuthController_1.default(adminServices, jwtUtility);
adminAuthRoutes.post('/login', adminAuthController.adminLogin);
adminAuthRoutes.get('/logout', adminAuthController.adminLogout);
exports.default = adminAuthRoutes;
//# sourceMappingURL=adminAuthRoutes.js.map