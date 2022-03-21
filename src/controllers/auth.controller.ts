import { Request, Response } from 'express';
import { signUpService } from '../services/auth.service';
import { validate } from 'class-validator';
import { plainToInstance } from "class-transformer";
import SignupUserDto from '../validators/signup-user.dto';
import { convertError } from '../base/utils';

/** Health check controller */
const signupController = (req: Request, res: Response) => {
    const userData = plainToInstance(SignupUserDto, req.body);
    validate(userData).then(async errors => {
        // errors is an array of validation errors
        if (errors.length > 0) 
            return res.status(400).send(convertError(errors));
        const user = await signUpService(userData);  
        return res.send(user)
    });
}

export {
    signupController,
}