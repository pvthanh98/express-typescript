import { getRepository } from 'typeorm';
import { User } from '../entity/user.entity';
import SignupUserDto from '../validators/signup-user.dto';

/** Sign up user */
const signUpService = async (userData: SignupUserDto)  => {
    const userRepo = await getRepository(User);
    const user = await userRepo.create(userData);
    await userRepo.save(user);
    return user
}


export {
    signUpService
}
