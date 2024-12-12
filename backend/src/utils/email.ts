import nodemailer from 'nodemailer';
import CustomError  from '../types/customError';
import envConfig from '../config/env';


export const sendResetPasswordEmail = async (
    email: string,
    role: string,
    resetToken: string
  ): Promise<void> => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: envConfig.EMAIL_USER,
          pass: envConfig.EMAIL_PASS,
        },
      });
  
      const resetLink = `http://localhost:5173/${role}/reset-password/${resetToken}`;
      const mailOptions = {
        from: envConfig.EMAIL_USER,
        to: email,
        subject: 'Reset Your Password',
        html: `
          <p>Hello,</p>
          <p>We received a request to reset your password. Click the link below to reset your password:</p>
          <p><a href="${resetLink}">${resetLink}</a></p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,</p>
          <p>The Support Team</p>
        `,
      };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
      const customError = error as CustomError;
      console.error(`Failed to send reset password email: ${customError.message}`);
      throw new Error(`Node Error: ${customError.message}`);
    }
  };

export const sendEmail = async (email: string, otp: number): Promise<void> => {
    try {
    
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: envConfig.EMAIL_USER,
                pass: envConfig.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: envConfig.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        const customError = error as CustomError;
        console.error(`Failed to send email: ${customError.message}`);
        throw new Error(`Node Error: ${customError.message}`);
    }
}
export const studentInvitationMail = async (data: any): Promise<void> => {
    try {
        // Create the transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: envConfig.EMAIL_USER,
                pass: envConfig.EMAIL_PASS
            }
        });

        // Destructure the data object
        const {studentId,studentname, email, classroomId, subject, teacherName } = data;

        // Define the email options
        const mailOptions = {
            from: envConfig.EMAIL_USER,
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

    } catch (error) {
        // Handle any errors
        const customError = error as Error;
        console.error(`Failed to send email: ${customError.message}`);
        throw new Error(`Node Error: ${customError.message}`);
    }
};

