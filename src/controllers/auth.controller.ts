import { Request, Response } from 'express';
import { signUpService, signInService } from '../services/auth.service';
import { validate } from 'class-validator';
import { plainToInstance } from "class-transformer";
import SignupUserDto from '../validators/signup-user.dto';
import SigninUserDto from '../validators/signin-user.dto';
import { convertError } from '../base/utils';

/** Health check controller */
const signupController = (req: Request, res: Response) => {
    const userData = plainToInstance(SignupUserDto, req.body);
    validate(userData).then(async errors => {
        // errors is an array of validation errors
        if (errors.length > 0) 
            return res.status(400).send(convertError(errors));
        const results = await signUpService(userData);  
        if (!results.err) {
            return res.json(results.data);
        } else {
            return res.status(400).json(results.err)
        }
    });
}

const signinController = (req: Request, res: Response) => {
    const userData = plainToInstance(SigninUserDto, req.body);
    validate(userData).then(async errors => {
        // errors is an array of validation errors
        if (errors.length > 0) 
            return res.status(400).send(convertError(errors));
        const results = await signInService(userData);  
        if (!results.err) {
            return res.json(results.data);
        } else {
            return res.status(400).json(results.err)
        }
    });
}

export {
    signupController,
    signinController
}