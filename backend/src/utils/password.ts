import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import { Response } from 'express';
const saltRounds = 10;

  class PasswordUtility {
  
    async  getHashedPassword(plainPassword:string):Promise<string> {
    
          const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
          return hashedPassword;
        
      }
      async comparePassword(plainPassword:string,hashedPassword:string):Promise<boolean>{
       
        const isMatch= await bcrypt.compare(plainPassword,hashedPassword)
        return isMatch
      }
  
}

export default  PasswordUtility

 