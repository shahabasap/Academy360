"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentInvitationMail = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async (email, otp) => {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        const customError = error;
        console.error(`Failed to send email: ${customError.message}`);
        throw new Error(`Node Error: ${customError.message}`);
    }
};
exports.sendEmail = sendEmail;
const studentInvitationMail = async (data) => {
    try {
        // Create the transporter object using SMTP transport
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });
        // Destructure the data object
        const { studentId, studentname, email, classroomId, subject, teacherName } = data;
        // Define the email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Invitation to Join Classroom',
            html: `
                <p>Hello ${studentname},</p>
        
                <p>You have been invited to join a new classroom.</p>
        
                <p><strong>Classroom Subject:</strong> ${subject}</p>
                <p><strong>Teacher:</strong> ${teacherName}</p>
        
                <p>Your classroom Id is ${classroomId}.</p>
                <p><a href="http://localhost:5173/unlock-classroom/?classroomid=${classroomId}&studentid=${studentId}">Click here</a> to unlock the classroom.</p>
        
                <p><strong style="font-size: 1.2em;">Important:</strong> Please login to your account before using the link.</p>
                <p>Please use this classroom id to join the classroom, and never miss it.</p>
        
                <p>Best regards,</p>
                <p>The Classroom Team</p>
            `
        };
        // Send the email
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        // Handle any errors
        const customError = error;
        console.error(`Failed to send email: ${customError.message}`);
        throw new Error(`Node Error: ${customError.message}`);
    }
};
exports.studentInvitationMail = studentInvitationMail;
//# sourceMappingURL=email.js.map