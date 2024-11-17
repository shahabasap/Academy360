"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const studentSchema = new mongoose_1.Schema({
    name: { type: String, require: true },
    password: { type: String, required: false },
    username: { type: String, require: true },
    gender: { type: String, require: false },
    phone: { type: Number, require: false },
    Joined: { type: Date, default: Date.now },
    Is_block: { type: Boolean, default: false },
    photo: { type: String, require: false },
    is_verified: { type: Boolean, default: false },
    classrooms: [
        {
            classroomId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Classroom' },
            IsLocked: { type: Boolean, default: true }
        }
    ],
    isGoogleSign: { type: String, default: false, require: false },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
    role: { type: String, default: "student" }
});
const studentModel = mongoose_1.default.model('Student', studentSchema);
exports.default = studentModel;
//# sourceMappingURL=studentModel.js.map