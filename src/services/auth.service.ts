import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import SignupUserDto from '../validators/signup-user.dto';
import SigninUserDto from '../validators/signin-user.dto';
import { AUTHENTICATION_ERROR } from '../base/templates/error/auth-error.template';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/** Sign up user */
const signUpService = async (userData: SignupUserDto)  => {
    /** Hash password */
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userData.password, salt);
   
    const userRepo = await getRepository(User);
    const userExist = await userRepo.findOne({where:{
        email:userData.email
    }});
    if (userExist) return {
        err: AUTHENTICATION_ERROR.EMAIL_EXIST,
        data: null
    }

    /** Create user to DB */
    const user = await userRepo.create(userData);
    user.password = hash;
    await userRepo.save(user);
    const { password, ...otherAttrs } = user;
    return {
        data:otherAttrs,
        err: null
    }
}

const signInService = async (userData: SigninUserDto)  => {
    const userRepo = await getRepository(User);
    const userExist = await userRepo.findOne({
        where:{
            email:userData.email
        },
        select: ["password","id","email"]
    });
    if (userExist) {
        const isAuthenticated = await bcrypt.compare(userData.password, userExist.password); 
        if (isAuthenticated) {
            const accessToken = await jwt.sign({ sub: userExist.id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            return {
                err: null,
                data: {
                    accessToken
                }
            } 
        }
    }

    return {
        err: AUTHENTICATION_ERROR.NOT_AUTHENTICATED,
        data:null
    }
}


export {
    signUpService,
    signInService
}
