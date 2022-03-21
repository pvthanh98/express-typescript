import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import SignupUserDto from '../validators/signup-user.dto';
import { AUTHENTICATION_ERROR } from '../base/templates/error/auth-error.template';
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


export {
    signUpService
}
