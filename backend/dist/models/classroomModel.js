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
const classroomSchema = new mongoose_1.Schema({
    subject: { type: String, required: true },
    classroomid: { type: String, required: true },
    description: { type: String, required: true },
    Is_blocked: { type: Boolean, default: false },
    teacherid: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    students: [{
            studentid: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Student', required: false },
            isVerified: { type: Boolean, required: false, default: false }
        }],
    examsid: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Exams', required: false }],
    worksid: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Works', required: false }],
    materialsid: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Materials', required: false }],
    announcementsid: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Announcements', required: false }]
}, { timestamps: true });
const classroomModel = mongoose_1.default.model('Classroom', classroomSchema);
exports.default = classroomModel;
//# sourceMappingURL=classroomModel.js.map