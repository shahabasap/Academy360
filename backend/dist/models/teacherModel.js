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
const teacherSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: false },
    phone: { type: Number, required: false },
    password: { type: String, required: false },
    JoinedDate: { type: Date, default: Date.now },
    classrooms: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Classroom' }],
    LastUpdation: { type: Date, default: Date.now },
    Is_block: { type: Boolean, default: false },
    photo: { type: String, required: false },
    proof: { type: String, required: false },
    qualification: { type: String, required: false },
    experiences: [
        {
            institute: { type: String, required: false },
            yearFrom: { type: Date, required: false },
            yearTo: { type: Date, required: false }
        }
    ],
    graduation: {
        college: { type: String, required: false, default: '' }, // Set required to true
        course: { type: String, required: false, default: '' }, // Set required to true
        yearFrom: { type: Date, required: false }, // Set required to true
        yearTo: { type: Date, required: false }, // Set required to true
    },
    postGraduation: {
        college: { type: String, required: false, default: '' }, // Set required to true
        course: { type: String, required: false, default: '' }, // Set required to true
        yearFrom: { type: Date, required: false }, // Set required to true
        yearTo: { type: Date, required: false }, // Set required to true
    },
    ugCertificate: { type: String, required: false },
    pgCertificate: { type: String, required: false },
    Is_verified: { type: Boolean, default: false },
    Is_submit: { type: Boolean, default: false, required: true },
    resetPasswordToken: { type: String, required: false },
    resetPasswordExpires: { type: Date, required: false },
    isGoogleSign: { type: Boolean, default: false },
    Approvel: {
        isApproved: { type: Boolean, default: false },
        message: { type: String, default: null },
    },
    role: { type: String, default: "teacher" },
});
const TeacherModel = mongoose_1.default.model('Teacher', teacherSchema);
exports.default = TeacherModel;
//# sourceMappingURL=teacherModel.js.map